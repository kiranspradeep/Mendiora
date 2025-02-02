const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup function
async function signupAttendee(req, res) {
  try {
    const { email, password, username, Name } = req.body;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.email === email
            ? "Email already exists"
            : "Username already exists",
      });
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new User({
      username,
      email,
      password: hashedPassword,
      Name,
      role: "attendee",
    });

    await userData.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: userData._id, email: userData.email },
      process.env.JWT_SECRETKEY,
      { expiresIn: "1d" }
    );

    res.status(201).json({ message: "Account created successfully", token });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

//login function
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

//update function
const updateAttendee = async (req, res) => {
  try {
    const { userId } = req.user;
    const updates = req.body;

    // Define allowed fields for updates
    const allowedFields = ["username", "email", "password", "name"];
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([key]) => allowedFields.includes(key))
    );

    // Fetch current user from the database
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the password if it's being updated
    if (filteredUpdates.password) {
      filteredUpdates.password = await bcrypt.hash(filteredUpdates.password, 10);
    }

    // Check for actual changes, including special handling for password
    const hasChanges = Object.entries(filteredUpdates).some(([key, value]) => {
      if (key === "password") return true; // Password always treated as changed
      return value !== currentUser[key];
    });

    if (!hasChanges) {
      return res.status(400).json({
        message: "No changes detected. Please update at least one field."
      });
    }

    // Handle unique email validation
    if (filteredUpdates.email && filteredUpdates.email !== currentUser.email) {
      const existingUser = await User.findOne({ email: filteredUpdates.email });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already taken" });
      }
    }

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: filteredUpdates },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Server error: " + error.message });
  }
};



//delete function
const deleteAttendee = async (req, res) => {
  try {
    const { userId } = req.user;
    const { password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};


//get all
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


//get single user 
const getSingleattendee = async (req, res) => {
  try { 
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signupAttendee,
  loginAttendee,
  updateAttendee,
  deleteAttendee,
  getAllAttendee,
  getSingleattendee,
};
