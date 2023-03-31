const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/userModel');
const {JWT_SECREY_KEY} = process.env;

async function checkToken(req, res, next) {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jsonwebtoken.verify(token, JWT_SECREY_KEY);
        const user = await User.findOne({ _id: decoded._id, token: token });
        if (!user) {
            return res.status(401).json({ message: "Please authenticate." });
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