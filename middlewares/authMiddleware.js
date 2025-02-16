const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); 

const protect = async (req, res, next) => {
    let token;

    console.log("Authorization Header:", req.headers.authorization);//  Debug Log

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // Extract token
            console.log("Extracted Token:", token); 

            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
            console.log("Decoded Token:", decoded); 

            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized - User not found" });
            }

            next();
        } catch (error) {
            console.error("Error in token verification:", error);
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }
    } else {
        console.log("No token provided in request");
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }
};

module.exports = protect;
