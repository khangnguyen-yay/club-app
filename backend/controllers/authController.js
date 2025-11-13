//import { findOrCreateUser } from '../services/authService.js';
// export const loginSuccess = async (req, res) => {
//   try {
//     const user = await findOrCreateUser(req.user);
//     res.json({
//       message: 'Authentication successful!',
//       user
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error processing authentication' });
//   }
// };
export const loginSuccess = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  res.json({
    message: 'Authentication successful!',
    user: req.user // Google profile info provided by Passport
  });
};

export const logout = (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.redirect('/');
  });
};
