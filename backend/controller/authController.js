import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import {generateToken} from '../lib/utils.js'


//register
export const register = async (req, res) => {
    console.log("REGISTER HIT", req.body);
    try {
        const { username, email, password } = req.body || {};
        // checking for missing fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // already registered user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        //creating new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save()
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};
//login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        //checking fields
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        //checking user
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPassCorrect = await bcrypt.compare(password, user.password);
        if (!isPassCorrect) {

            return res.status(401).json({ message: "Invalid credentials" });
        }
        /* 
        TOKEN consist of 3 parts - header, payload, signature
        header - algorithm and token type
        payload - data we want to store in the token(id , email, etc...)
        signature - to verify the token is not tampered with
        base64url(header).base64url(payload).signature
        */

        const token = generateToken(user._id, res);
        res.status(200).json({ token, message: "Login successfull" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
}
//logout
export const logout = (req, res) => {
    try {
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
      });
  
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
