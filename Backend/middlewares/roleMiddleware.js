function checkStatus(permissions) {
    const allowedRoles = new Set(permissions);
    return (req, res, next) => {
        if (allowedRoles.has(req.user.status)) {
            next();
        } else {
            return res.status(401).json({ message: "You don't have permission!" });
        }
    };
}

module.exports = { checkStatus };
