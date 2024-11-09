import { User } from '../models/Schema/userSchema.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


export const signup = async (req, res) => {

  try {

    const { firstName, lastName, email, pass, publicKey, privateKey } = req.body;


    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists', success: false });
    }


    const newUser = new User({
      firstName,
      lastName,
      email,
      pass,
      publicKey,
      privateKey,
    });
    newUser.pass = await bcrypt.hash(pass, 10);


    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );


    return res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,

        publicKey: newUser.publicKey,
      },
    });

  } catch (error) {

    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};



export const login = async (req, res) => {
  try {
    const { email, pass } = req.body;


    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ message: "User not found, please signup first", success: false });
    }


    const isPassEqual = await bcrypt.compare(pass, user.pass);
    if (!isPassEqual) {
      return res.status(403).json({ message: "Incorrect Password", success: false });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Respond with the token
    return res.status(200).json({
      message: "Login Successful",
      user: {
        id: newUser._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        privateKey: user.privateKey,
        publicKey: user.publicKey,
      },
      success: true,
      token
    });

  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message
    });
  }
};