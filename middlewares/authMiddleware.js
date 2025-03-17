const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader); //debug log

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const token = authHeader.split(" ")[1]; //extract token
        console.log("Extracted Token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verifying token
        console.log("Decoded Token:", decoded);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        req.user = user; //attach user to request
        next();
    } catch (error) {
        console.error("Error in token verification:", error);
        return res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
    }
};

module.exports = protect;
