export const loginSuccess = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

    // For testing: redirect the browser to fronted
  const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
    return res.redirect(frontendOrigin);
};

export const logout = (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    console.log('User logged out successfully');
    res.redirect('/api/clubs');
  });
};
