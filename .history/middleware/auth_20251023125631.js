const { verifyToken } = require("../services/auth");
const User = require('../models/user');

async function checkForAuthCookie(cookieName) {
    return async (req, res, next) => {
        const token = req.cookies[cookieName];
        if (!token) return next();

        try {
            const payload = verifyToken(token); // decode token
            if (payload && payload._id) {
                // fetch full user from DB to ensure _id exists
                const user = await User.findById(payload._id);
                req.user = user; // attach complete user object
            }
        } catch (err) {
            console.error("Invalid token:", err.message);
        }

        return next();
    };
}

module.exports = { checkForAuthCookie };
