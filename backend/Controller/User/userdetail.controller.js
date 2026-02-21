const User = require('../../Models/User/userdetail.model');

// Update User Profile
const updateProfile = async (req, res) => {
  try {
    const {
      address,
      bloodGroup,
      allergies,
      gender,
      dateOfBirth,
      emergencyContact
    } = req.body;

    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        address,
        bloodGroup,
        allergies,
        gender,
        dateOfBirth,
        emergencyContact
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get User Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { updateProfile, getProfile };