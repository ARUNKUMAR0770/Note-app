import express from 'express';
import User from '../models/user.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


//register
export const register = async(req,res) =>{
    console.log("REGISTER HIT", req.body);
    try{
        const { username, email, password } = req.body || {};
    // checking for missing fields
    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    // already registered user
    const existingUser = await User.findOne({ email});
    if(existingUser){
        return res.status(409).json({message:"User already exists"});
    }
    //creating new user
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
        username,
        email,
        password : hashedPassword,
    });
    await newUser.save()
    res.status(201).json({message:"User registered successfully"});
    }
    catch(error){
        res.status(500).json({message:"Server Error"});
    }
};
//login
export const login = async(req,res) =>{
    const { email, password } = req.body 
    //checking fields
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    //checking user
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    const isPassCorrect = bcrypt.compareSync(password, user.password);
    if(!isPassCorrect){
        
        return res.status(401).json({message:"Invalid credentials"});
    }
    /* 
    TOKEN consist of 3 parts - header, payload, signature
    header - algorithm and token type
    payload - data we want to store in the token(id , email, etc...)
    signature - to verify the token is not tampered with
    base64url(header).base64url(payload).signature
    */
    const token = jwt.sign(
        {
         userId: user._id,
         username:user.username
        },
        process.env.JWT_KEY,
        {expiresIn: "1d"}
    )
    res.status(200).json({token, message:"Login successfull"});
}
