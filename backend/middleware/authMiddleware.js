import jwt from "jsonwebtoken";
import env from "dotenv";
import User from "../models/user.js";
env.config();

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.cookies || !req.cookies.jwt) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized, User not found" });
    }
    req.user = user;
    next();

  } catch (error) {
    console.error("Error in protectRoute middleware", error);
    res.status(500).json({ message: "server error" });
  }
};

export default authMiddleware;
