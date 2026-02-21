const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const database = () => mongoose.connect(process.env.MongoDB_URI)
  .then(() => { 
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
  module.exports = database;