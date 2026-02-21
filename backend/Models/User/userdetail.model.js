const mongoose = require('mongoose');

const userdetail = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    trim: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  allergies: {
    type: String
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  emergencyContact: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Patient", userdetail);