const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup function
async function signupAttendee(req, res) {
  try {
    const { email, password, username, firstName, lastName } = req.body;

    //emailvalidation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const userExit = await User.findOne({ email });
    if (userExit) {
      res.status(400).json({ message: "User already exist" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = new User({
        username: username,
        email: email,
        password: hashedPassword,
        firstName,
        lastName: lastName,
        role:"attendee"
      });
      

      await userData.save();
      const token = jwt.sign(
        { userId: userData._id, email: userData.email },
        process.env.JWT_SECRETKEY,
        { expiresIn: "1d" }
      );
      res.status(201).json({ message: "account created", token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//login
async function loginAttendee(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRETKEY,
      { expiresIn: "1d" }
    );
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const updateAttendee = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming `req.user` contains the authenticated user's details
    const updates = req.body; // Extract fields to update from the request body

    // Handle password hashing if provided in the updates
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // Ensure only the allowed fields are updated
    const allowedFields = ['username', 'email', 'password', 'firstName', 'lastName'];
    const filteredUpdates = {};
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        filteredUpdates[field] = updates[field];
      }
    }

    // Fetch the current user from the database
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if there are any actual changes
    const isIdentical = Object.keys(filteredUpdates).every(
      (key) => 
        key === 'password'
          ? false // Always treat password as different for security purposes
          : filteredUpdates[key] === currentUser[key]
    );

    if (isIdentical) {
      return res.status(400).json({ message: 'Nothing to update. All values are the same.' });
    }

    // Proceed with the update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: filteredUpdates },
      { new: true, runValidators: true } // Return the updated document and validate against schema
    );

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

  
  
//   code to delete users
  const deleteAttendee = async (req, res) => {
    try {
      const { userId } = req.user;
  
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  };

  const getAllAttendee = async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users
      console.log(users);
  
      res.status(200).json({ users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error: " + error.message });
    }
  };

  const getSingleattendee = async (req, res) => {
    try {
      const { userId } = req.user; // Assuming `req.user` contains authenticated user's details
  
      // Fetch the user by their ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error: " + error.message });
    }
  };
  

module.exports = {
  signupAttendee,
  loginAttendee,
  updateAttendee,
  deleteAttendee,
  getAllAttendee,
  getSingleattendee
};
