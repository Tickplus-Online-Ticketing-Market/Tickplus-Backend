const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

// Fetch all users
const fetchUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log("Fetched users:", users); // Debug line
        res.json({ users });
    } catch (error) {
        console.error("Error fetching users:", error); // Debug line
        res.status(500).json({ error: 'Error fetching users' });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const { username, email, password, address, contactnumber, dateOfBirth, role } = req.body;
        console.log("Received user data:", req.body); // Debug line

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedPassword); // Debug line

        const user = await User.create({
            username,
            email,
            password,
            address,
            contactnumber,
            dateOfBirth,
            role,
        });

        console.log("Created user:", user); // Debug line
        res.status(201).json({ user });
    } catch (error) {
        console.error("Error creating user:", error); // Debug line
        res.status(500).json({ error: 'Error creating user' });
    }
};

// User login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log("Found user:", user); // Debug line
        if (!user) {
            return res.status(404).json("nouser");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", passwordMatch); // Debug line

        if (passwordMatch) {
            return res.status(200).json("loginPass");
        } else {
            return res.status(401).json("loginFail");
        }
    } catch (error) {
        console.error("Login error:", error); // Debug line
        return res.status(500).json("fail");
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email, password, address, contactnumber, dateOfBirth, role } = req.body;
        console.log("Received updated user data:", req.body); // Debug line

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.username = username;
        user.email = email;
        user.address = address;
        user.contactnumber = contactnumber;
        user.dateOfBirth = dateOfBirth;
        user.role = role;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
            console.log("Updated password:", user.password); // Debug line
        }

        await user.save();
        console.log("Updated user:", user); // Debug line
        res.json({ user });
    } catch (error) {
        console.error("Error updating user:", error); // Debug line
        res.status(500).json({ error: 'Error updating user' });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        console.log("Deleted user with ID:", userId); // Debug line
        res.json({ success: "Record deleted" });
    } catch (error) {
        console.error("Error deleting user:", error); // Debug line
        res.status(500).json({ error: 'Error deleting user' });
    }
}

module.exports = {
    fetchUsers,
    createUser,
    loginUser,
    updateUser,
    deleteUser,
}
