const mongoose = require("mongoose");
require('dotenv').config();

const mongoUri = process.env.MONGODB_URI;


const connectDb = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log(" MongoDB connected");
  } catch (error) {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDb;

