export const ensureAuth = (req, res, next) => {
    /*
    Session-based Passport checks:
    req.isAuthenticated → Ensures Passport is installed and the middleware is running correctly. Checks if there is a function provided by Passport for auth checks
    req.isAuthenticated() → Checks if the user really logged in according to Passport
    */
    console.log('ensureAuth: isAuthenticated=', !!(req.isAuthenticated && req.isAuthenticated()));
	if (req.isAuthenticated && req.isAuthenticated()) return next();
	res.status(401).json({ message: 'Unauthorized' });
};

export default ensureAuth;