const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // 👇 New Profile Fields
  address: { type: String },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  },
  allergies: { type: String },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
  },
  dateOfBirth: { type: Date },
  emergencyContact: { type: String }
});
const userdetail=mongoose.model('Userdetail',userSchema);
module.exports=userdetail;
