import { getUserClubsByStatus, getAllUserClubsWithStatus, insertUserPreference, updateUserPreference } from "../services/statusService.js";

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

export async function addUserPreference(req, res) {
  const { userId } = req.params;
  const { clubId, preference } = req.body;

  try {
    // Look for existing row
    const existing = await getUserPreference(userId, clubId);

    // UPDATE if found
    if (existing) {
      const result = await updateUserPreference(userId, clubId, preference);
      return res.json({ message: "Preference updated", ...result });
    }

    // INSERT if not found
    const result = await insertUserPreference(
      userId,
      clubId,
      preference || "none"
    );
    return res.json({ message: "Preference added", ...result });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
