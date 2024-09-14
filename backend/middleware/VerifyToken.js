const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // Check if the token is provided
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }

    // Verify the token
    const data = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });

    // Attach the user ID to the request
    req.userId = data._id;

    // Proceed to the next middleware
    next();
  } catch (err) {
    // Handle errors related to token verification
    return res.status(403).json({ message: "Token is not valid!" });
  }
};

module.exports = verifyToken;
