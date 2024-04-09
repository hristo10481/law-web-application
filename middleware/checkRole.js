// middleware/checkRole.js

function checkRole(role) {
    return function(req, res, next) {
        if (req.isAuthenticated() && req.user.role === role) {
            next();
        } else {
            res.status(403).send("Нямате права за достъп до този ресурс.");
        }
    }
}

module.exports = checkRole;


