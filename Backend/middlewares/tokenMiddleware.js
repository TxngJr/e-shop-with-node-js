const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/userModel');


async function checkToken(req, res, next) {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jsonwebtoken.verify(token, process.env.JSONWEBTOKEN_SECRET);
        const user = await User.findOne({ _id: decoded.userId, token: token });
        if (!user) {
            throw new Error();
        };
        if (user.status === "ban") {
            return res.status(401).json({ message: "You are Banned." });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Please authenticate." });
    }
};

module.exports = { checkToken };