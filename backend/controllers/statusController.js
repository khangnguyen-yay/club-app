import { getUserClubsByStatus, getAllUserClubsWithStatus, addUserClubPreference, updateUserClubPreference, getUserClubPreference } from "../services/statusService.js";

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

/*
NOTE: "Status" and "Preference" are used interchangeably. To make it easier to differentiate between
functions for GET and POST requests, "Status" is used in function names for GET requests, while "Preference" is 
used in function names for POST requests.
*/
export async function modifyUserClubStatus(req, res) {
  // req.user only exists if user has been authenticated via ensureAuth middleware; 
  // optional chaining allows for userId to evaluate as undefined rather than throwing a runtime error
  const userId = req.user?.id;
  const { clubId, preference } = req.body;

  if (!userId) return res.status(401).json({ error: 'User is not authenticated' });
  if (!clubId) return res.status(400).json({ error: 'Missing clubId in request body' });
  if (!preference) return res.status(400).json({ error: 'Missing preference in request body' });
 
  try {
    // See if user already has an existing preference for a club to determine whether to add or update the club preference
    const existing = await getUserClubPreference(userId, clubId);
    const result = existing
      ? await updateUserClubPreference(userId, clubId, preference)
      : await addUserClubPreference(userId, clubId, preference);

    return res.json({ message: existing ? "Status updated" : "Status added", ...result });

  } catch (err) {
    console.error("modifyUserClubStatus error: ", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export const getAllUserClubsWithStatusController = async (req, res) => {
  try {
    // Require authenticated user (middleware should set req.user)
    const user = req.user;
    console.log('statusController.getAllUserClubsWithStatus -> req.user =', user);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const clubs = await getAllUserClubsWithStatus(
      user.id || user.google_id || user.id
    );

    res.json(clubs);
  } catch (err) {
    console.error("clubsWithStatus error:", err);
    res.status(500).json({ error: err.message });
  }
};

