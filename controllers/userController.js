const getUserProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        return res.status(200).json({
            message: "User profile retrieved successfully",
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
            },
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { getUserProfile };
