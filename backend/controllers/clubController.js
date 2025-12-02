import { getAllClubs } from '../services/clubService.js';

//return json format of all clubs found in database
export const getClubs = async (req, res) => {
  try {
    const userID = req.query.user_id;
    const clubs = await getAllClubs(userID);
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
