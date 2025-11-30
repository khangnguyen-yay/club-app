import { getAllClubs } from '../services/clubService.js';

//return json format of all clubs found in database
export const getClubs = async (req, res) => {
  try {
    const clubs = await getAllClubs();
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
