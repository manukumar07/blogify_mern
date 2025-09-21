const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.route");
const path = require("path");
const cookieParser = require("cookie-parser");
const ConnectDB = require("./config/db");
const postRoutes = require("./routes/post.route")
const commentRoutes = require("./routes/comment.route")
const aiRoutes = require("./routes/ai.routes")

dotenv.config();

const app = express();

// Define PORT Number
const PORT = process.env.PORT || 8000;

app.use(cookieParser());
app.use(bodyParser.json());




// ✅ Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",  // frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//route 
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/ai", aiRoutes);

//listening port
ConnectDB(); //db
app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});
