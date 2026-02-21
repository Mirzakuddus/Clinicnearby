const jwt = require("jsonwebtoken");
const User = require("../Models/User/user.model");

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Received token:", token); // Debugging log
    if (!token)
      return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id).select("-password");
  console.log("Authenticated user:", decoded);
  console.log("Request user:", req.user); // Debugging log
    next();


  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;