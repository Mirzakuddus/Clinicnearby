const registerUser = require('../../Models/User/user.model');
const userdetail = require('../../Models/User/userdetail.model');

const getLoggedInUser = async (req, res) => {
  try {
    // req.user comes from protect middleware
    const user = await registerUser.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const profile = await userdetail.findOne({ userId: req.user._id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const {
      address,
      bloodgroup,
      allergies,
      gender,
      dob,
      emergencyContact,
    } = req.body;

    let profile = await userdetail.findOne({ userId: req.user._id });

    if (!profile) {
      // If profile doesn't exist → create it
      profile = await userdetail.create({
        userId: req.user._id,
        address,
        bloodgroup,
        allergies,
        gender,
        dob,
        emergencyContact,
      });
    } else {
      // If exists → update
      profile.address = address ?? profile.address;
      profile.bloodgroup = bloodgroup ?? profile.bloodgroup;
      profile.allergies = allergies ?? profile.allergies;
      profile.gender = gender ?? profile.gender;
      profile.dob = dob ?? profile.dob;
      profile.emergencyContact =
        emergencyContact ?? profile.emergencyContact;

      await profile.save();
    }

    res.status(200).json({
      message: "Profile saved successfully",
      profile,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = { getLoggedInUser,getUserProfile,updateUserProfile};
