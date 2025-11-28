import { getUserClubsByStatus, getAllUserClubsWithStatus, insertUserStatus, updateUserStatus, getUserClubPreference } from "../services/statusService.js";

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

export async function addUserStatus(req, res) {
  const user = req.user; // populated by ensureAuth middleware
  const userId = user?.id || user?.google_id || null;
  const { clubId, preference } = req.body;

  console.log("addUserStatus -> user:", user);

  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  if (!clubId) return res.status(400).json({ error: 'Missing clubId in request body' });

  try {
    const existing = await getUserClubPreference(userId, clubId);

    if (existing) {
      const result = await updateUserStatus(userId, clubId, preference || existing.preference || 'none');
      return res.json({ message: "Status updated", ...result });
    }

    const result = await insertUserStatus(
      userId,
      clubId,
      preference || 'none'
    );

    return res.json({ message: "Status added", ...result });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

