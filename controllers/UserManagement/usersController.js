const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const router = express.Router();

// Fetch all users
const fetchUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

const retrieveUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json("fail");
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      address,
      contactnumber,
      dateOfBirth,
      role,
    } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password,
      address,
      contactnumber,
      dateOfBirth,
      role,
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("nouser");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return res.status(200).json("loginPass");
    } else {
      return res.status(401).json("loginFail");
    }
  } catch (error) {
    return res.status(500).json("fail");
  }
};
// Update a user by email
const updateUser = async (req, res) => {
  const {
    username,
    password,
    email,
    address,
    contactnumber,
    dateOfBirth,
    role,
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.username = username;
    user.address = address;
    user.contactnumber = contactnumber;
    user.dateOfBirth = dateOfBirth;
    user.role = role;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

// Delete a user by email
const deleteUser = async (req, res) => {
    // Extract email from request body
    const { email } = req.body;
  
    try {
      // Attempt to find and delete the user by email
      const user = await User.findOneAndDelete({ email });
  
      // If user not found, respond with a 404 status and message
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // If deletion is successful, respond with success message
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      // Log error for debugging
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
module.exports = {
  fetchUsers,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  retrieveUser,
};
