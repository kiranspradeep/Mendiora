const OrganizerAdmin = require("../models/OrganizerAdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup function
async function signupUser(req, res) {
  try {
    const { email, password, username, Name, isApproved = 'pending' } = req.body; // Default is 'pending' if not provided

    // Check if email or username already exists
    const existingUser = await OrganizerAdmin.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.email === email 
          ? "Email already exists" 
          : "Username already exists" 
      });
    }

    // Hash password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new OrganizerAdmin({
      username,
      email,
      password: hashedPassword,
      Name,
      isApproved // Use the passed in value or default to 'pending'
    });

    await userData.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: userData._id, email: userData.email, role: userData.role, isApproved: userData.isApproved },
      process.env.JWT_SECRETKEY,
      { expiresIn: "1d" }
    );

    res.status(201).json({ message: "Account created successfully", token });

  } catch (error) { 
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username or email already exists" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
}



//login
async function loginUser(req, res) { 
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await OrganizerAdmin.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Check if the user's account is approved (must be "approved")
    if (user.isApproved !== 'approved') {
      return res.status(403).json({ message: "Account not approved" });
    }

    // Validate the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role, isApproved: user.isApproved },
      process.env.JWT_SECRETKEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



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


//get unapproved users 
const getUnapprovedOrganizers = async (req, res) => { 
  try {
    // Query for organizers whose isApproved is "pending"
    const unapprovedOrganizers = await OrganizerAdmin.find({ 
      role: "organizer", 
      isApproved: 'pending' // Check for pending status
    });

    if (!unapprovedOrganizers.length) {
      return res.status(404).json({ message: "No unapproved organizers found" });
    }

    res.status(200).json({ users: unapprovedOrganizers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// Approve Organizer
const approveOrganizer = async (req, res) => {
  try {
    const { userId } = req.params;

    const organizer = await OrganizerAdmin.findById(userId);
    if (!organizer) {
      return res.status(404).json({ message: "Organizer not found" });
    }

    if (organizer.isApproved === 'approved') {
      return res.status(400).json({ message: "Organizer is already approved" });
    }

    organizer.isApproved = 'approved';
    await organizer.save();

    res.status(200).json({ message: "Organizer approved successfully", organizer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// Reject Organizer
const rejectOrganizer = async (req, res) => {
  try {
    const { userId } = req.params;

    const organizer = await OrganizerAdmin.findById(userId);
    if (!organizer) {
      return res.status(404).json({ message: "Organizer not found" });
    }

    if (organizer.isApproved === 'rejected') {
      return res.status(400).json({ message: "Organizer is already rejected" });
    }

    organizer.isApproved = 'rejected';
    await organizer.save();

    res.status(200).json({ message: "Organizer rejected successfully", organizer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};



//update user
const updateUser = async (req, res) => {
  const { username, email, name, password, newPassword } = req.body;
  const userId = req.user.userId; // Assuming you're extracting user from the token

  
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the current password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
   
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Update user fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (name) user.Name = name;

    // Update the password if a new one is provided
    if (newPassword) {
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



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


//function to get details of user loged in using auth
const getLoggedInUser = async (req, res) => {
  try { 
    const user = await OrganizerAdmin.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
      };


module.exports = {
  signupUser,
  loginUser,
  updateUser,
  deleteUser,
  getOrganizers,
  getLoggedInUser,
  getUnapprovedOrganizers,
  approveOrganizer,
  rejectOrganizer
};
