const Patient = require('../../Models/User/userdetail.model');

// Update User Profile
const userprofile = async (req, res) => {
  try {
    const { address, bloodgroup, allergies, gender, dob, emergencyContact } = req.body;
    console.log("Received user profile data:", req.body); // Debugging log
    // Basic validation
    if (!address || !bloodgroup || !gender || !emergencyContact) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Parse dob from DD-MM-YYYY to Date
    const parsedDob = new Date(dob.split('-').reverse().join('-'));

    const newPatient = new Patient({
      userId: req.user._id, // Assuming req.user is set by auth middleware
      address,
      bloodgroup,
      allergies,
      gender,
      dob: parsedDob,
      emergencyContact
    });

    const savedPatient = await newPatient.save();

    res.status(201).json({
      message: "Patient information saved successfully",
      data: savedPatient
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { userprofile };