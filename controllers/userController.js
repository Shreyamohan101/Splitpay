const getUserProfile = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    });
};

module.exports = { getUserProfile };
