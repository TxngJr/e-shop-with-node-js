function checkStatus(permissions) {
    const allowedRoles = new Set(permissions);
    console.log(allowedRoles);
    return (req, res, next) => {
        const { status } = req.user;
        if (allowedRoles.has(status)) {
            next();
        } else {
            return res.status(401).json({ message: "You don't have permission!" });
        }
    };
}

module.exports = { checkStatus };
