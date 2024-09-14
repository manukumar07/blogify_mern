const mongoose = require("mongoose");
const dotenv = require("dotenv");

const DB =
  "mongodb+srv://palmanukumar53:Ryb0wMIgt14F30LK@cluster0.xwxmwhv.mongodb.net/";
const connectDb = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Connection successfully");
  } catch (error) {
    console.error(" Connection failed");
    process.exit(0);
  }
};

module.exports = connectDb;
