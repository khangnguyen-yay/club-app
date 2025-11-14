import { getUserClubsByStatus } from "../services/statusService.js";
export const getUserStatus = async (req, res) => {
    try {
        const status = await getAllUserPrefs();
        res.json(prefs);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};