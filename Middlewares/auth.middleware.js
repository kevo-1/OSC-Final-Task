const jwt = require('jsonwebtoken');
const users = require('./../Models/user.models');
require('dotenv').config();

const checkUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "No token provided"
            });
        }
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        req.userId = decoded.id;
        const user = await users.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: "Invalid or expired token",
            error: error.message
        });
    }
};

module.exports = { checkUser };
