export const ensureAuth = (req, res, next) => {
	// Session-based Passport check
    console.log('ensureAuth: isAuthenticated=', !!(req.isAuthenticated && req.isAuthenticated()), 'auth header=', req.headers.authorization);
	if (req.isAuthenticated && req.isAuthenticated()) return next();

	// Fallback: JWT in Authorization header (Bearer)
	// const auth = req.headers.authorization;
	// if (auth && auth.startsWith('Bearer ')) {
	// 	try {
	// 		const token = auth.slice(7);
	// 		// lazy require to avoid adding top-level dependency if not used
	// 		const jwt = require('jsonwebtoken');
	// 		const payload = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwt');
	// 		req.user = payload; // payload should include user id/email
	// 		return next();
	// 	} catch (err) {
	// 		// invalid token -> fall through to unauthorized
	// 	}
	// }

	res.status(401).json({ message: 'Unauthorized' });
};

export default ensureAuth;