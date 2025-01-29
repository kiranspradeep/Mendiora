const OrganizerAdmin = require("../models/OrganizerAdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup function
async function signupUser(req, res) {
  try {
    const { email, password, username, firstName, lastName } = req.body;

    const userExit = await OrganizerAdmin.findOne({ email });
    if (userExit) {
      res.status(400).json({ message: "User already exist" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = new OrganizerAdmin({
        username: username,
        email: email,
        password: hashedPassword,
        firstName,
        lastName: lastName,
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
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await OrganizerAdmin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
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
const updateUser = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming `req.user` contains the authenticated user's details
    const updates = req.body; // Extract fields to update from the request body

    // Handle password hashing if provided in the updates
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // Ensure only the allowed fields are updated
    const allowedFields = [
      "username",
      "email",
      "password",
      "firstName",
      "lastName",
    ];
    const filteredUpdates = {};
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        filteredUpdates[field] = updates[field];
      }
    }

    const updatedUser = await OrganizerAdmin.findByIdAndUpdate(
      userId,
      { $set: filteredUpdates },
      { new: true, runValidators: true } // Return the updated document and validate against schema
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

//   code to delete users
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.user;

    const deletedUser = await OrganizerAdmin.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

//a function to get users with role organizer
const getOrganizers = async (req, res) => {
  try {
    const users = await OrganizerAdmin.find({ role: "organizer" });
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

//function to get details of user loged in using auth
const getLoggedInUser = async (req, res) => {
  try {
    const user = await OrganizerAdmin.findById(req.user.userId);
    res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error: " + error.message });
      }
      };


module.exports = {
  signupUser,
  loginUser,
  updateUser,
  deleteUser,
  getOrganizers,
  getLoggedInUser
};
