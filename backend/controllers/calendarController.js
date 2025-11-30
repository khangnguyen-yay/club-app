import { getClubAppDeadlines } from '../services/calendarService.js';

export const getClubDeadlines = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const deadlines = await getClubAppDeadlines(userId);
    res.json({ deadlines });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};