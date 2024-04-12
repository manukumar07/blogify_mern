const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000; // define port number

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// image upload
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  // console.log(req.body)
  res.status(200).json("Image has been uploaded successfully!");
});

//listening port
connectDb();
app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});
