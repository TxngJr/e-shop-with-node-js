const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

function getUser(req, res) {
  return res.status(200).json(req.user);
};

async function getUsers(req, res) {
  try {
    const user = await User.find({});
    return res.status(200).json({ user })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while getting the users." });
  }
}

async function createUser(req, res) {
  const { name, email, password } = req.body;
  if (!(name && email && password)) {
    return res.status(400).json({ "message": "Please provide a valid name, email, and password." })
  };
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ message: "That email address is already registered. Please choose a different email." });
    };
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword
    });
    await user.save();
    return res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while creating the user." });
  }
};

async function getToken(req, res) {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({ message: "Please provide an email and password." });
  };
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    };
    if (!user.token) {
      const token = jsonwebtoken.sign({ userId: user._id }, process.env.JSONWEBTOKEN_SECRET);
      user.token = token;
      await user.save();
      return res.status(200).json({ token: token });
    };
    return res.status(200).json({ token: user.token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while logging in." });
  }
};

async function deleteToken(req, res) {
  try {
    req.user.token = null;
    await req.user.save();
    res.status(200).json({ message: "User logged out successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while logging out." });

  }
};
async function banUser(req, res) {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.status = 'ban';
    await user.save();
    res.status(201).json({ message: 'User banned successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while finding user." });
  }
};

module.exports = { getUser, getUsers, createUser, getToken, deleteToken, banUser };