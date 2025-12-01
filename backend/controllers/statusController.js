import { getUserClubsByStatus, getAllUserClubsWithStatus, addUserClubPreference, updateUserClubPreference, getUserClubPreference } from "../services/statusService.js";
/*NOTE: "status" and "preference" are used interchangeably*/

export const getUserClubStatus = async (req, res) => {
    try {
        // Require authenticated user (middleware should set req.user)
        const user = req.user;
        console.log('statusController.getUserClubStatus -> req.user =', user);
        if (!user) return res.status(401).json({ error: 'Unauthorized' });

        const status = req.query.status; // optional query param
        if (status) {
            const clubs = await getUserClubsByStatus(user.id || user.google_id || user.id, status);
            return res.json(clubs);
        }

        // If no status provided, return all preferences for the user
    const prefs = await getAllUserClubsWithStatus(user.id || user.google_id || user.id);
        res.json(prefs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export async function modifyUserClubStatus(req, res) {
  // User object is stored in req.user after user deserialization by Passport
  const userId = req.user?.id || req.user?.google_id;
  const { clubId, preference } = req.body;

  //Validation
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  if (!clubId) return res.status(400).json({ error: 'Missing clubId in request body' });
  if (!preference) return res.status(400).json({ error: 'Missing preference in request body' });
 
  try {
    // If the user already has a preference for this club
    const existing = await getUserClubPreference(userId, clubId);

    //Determine action: update existing preference or add a new one
    const result = existing
      ? await updateUserClubPreference(userId, clubId, preference)
      : await addUserClubPreference(userId, clubId, preference);
    
    //Send Response
    return res.json({ message: existing ? "Status updated" : "Status added", ...result });
  } catch (err) {
    console.error("modifyUserClubStatus error: ", err);
    return res.status(500).json({ error: "Server error" });
  }
}

