const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

// Fetch all users
const fetchUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const { username, email, password, address, contactnumber, dateOfBirth, role } = req.body;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            address,
            contactnumber,
            dateOfBirth,
            role,
        });

        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
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

        const passwordMatch = await bcrypt.compare(password, user.password);;

        if (passwordMatch) {
            return res.status(200).json("loginPass");
        } else {
            return res.status(401).json("loginFail");
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json("fail");
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email, password, address, contactnumber, dateOfBirth, role } = req.body;

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
        }

        await user.save();
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.json({ success: "Record deleted" });
    } catch (error) {
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
