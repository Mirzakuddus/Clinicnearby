const mongoose = require('mongoose');

const userdetail = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  address: {
    type: String,
    required: true,
    trim: true
  },
  bloodgroup: {
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