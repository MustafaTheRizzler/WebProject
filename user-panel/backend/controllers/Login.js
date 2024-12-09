const express = require('express');
const User = require('../models/user'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.post('/signup', async (req, res) => {
  const { firstName , lastName , email , password } = req.body;

  try {
 
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists!' });
    }

   
    const user = new User({ firstName , lastName , email , password });
    await user.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {

    res.status(500).json({ message: 'Error creating user', error });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }

    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }

   
    const token = jwt.sign({ userId: user._id }, 'mySuperSecretKey123456', { expiresIn: '1h' });

    
    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

module.exports = router;
