const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming you have a User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Replace 'yourSecretKey' with a strong, unique secret key
const secretKey = 'yourSecretKey';

// POST /api/v1/user/signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password, email} = req.body;

    // Perform validation, check if the user already exists, and hash the password
    if (!username || !password || !email) {
      return res.status(400).json({
        status: false,
        message: 'Invalid username or password',
      });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: 'User already exists',
      });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });

    // Save the user to the database
    await user.save();

    res.status(201).json({
      status: true,
      message: 'User created successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'User creation failed',
    });
  }
});

// POST /api/v1/user/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: 'Invalid username or password',
      });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: false,
        message: 'Invalid username or password',
      });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      status: true,
      username: user.username,
      message: 'User logged in successfully',
      jwt_token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Login failed',
    });
  }
});

module.exports = router;
