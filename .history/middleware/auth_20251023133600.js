const { verifyToken } = require("../services/auth");

function checkForAuthCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) {
            return next(); // no token, just continue
        }

        try {
            const userPayload = verifyToken(tokenCookieValue);
            cons
            req.user = userPayload; // attach user to request
        } catch (err) {
            console.error("Invalid token:", err.message);
        }

        return next(); // ✅ make sure to call next() always
    };
}

module.exports = { checkForAuthCookie };
