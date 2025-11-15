export const loginSuccess = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

    // For testing: redirect the browser to the API endpoint that returns the
  // authenticated user's club preferences. This requires the session cookie
  // to be set and sent by the browser (sameSite settings and credentials).
  return res.redirect('/api/user/clubs');
};

export const logout = (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.redirect('/');
  });
};
