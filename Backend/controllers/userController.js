const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECREY_KEY } = process.env;



//get my data
async function getMyUser(req, res) {
  const { name, email, address, phone } = req.user
  return res.status(200).json({ name, email, address, phone });
};

//Get user if not admin you can get only your data
async function getUser(req, res) {
  try {
    const { name } = req.params;
    const user = await User.findOne({ name: name }, { password: 0, token: 0 });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    };
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while getting the user." });
  }
};

//Get all user
async function getUsers(req, res) {
  try {
    const users = await User.find({}, { password: 0, token: 0 });
    if (!users) {
      return res.status(404).json({ message: "Users not found." });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while getting the users." });
  }
};

//Update my user
async function updateMyUser(req, res) {
  try {
    const { password, address, phone } = req.body;
    if (!(password || address || phone)) {
      return res.status(400).json({ message: "Please provide a valid password or address or phone." });
    }
    const hashedpassword = await bcrypt.hashSync(password, 10);
    const user = await User.findOneAndUpdate({ name: req.user.name }, { password: hashedpassword, address: address, phone: phone }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    };
    return res.status(200).json({ message: "User update success." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while updating the user." });
  }
};

//Update user
async function updateUser(req, res) {
  try {
    const { name } = req.params;
    const { password, address, phone, status } = req.body;
    if (!(password || address || phone || status)) {
      return res.status(400).json({ message: "Please provide a valid password or address or phone." });
    }
    const hashedpassword = await bcrypt.hashSync(password, 10);
    const user = await User.findOneAndUpdate({ name: name }, { password: hashedpassword, address: address, phone: phone, status: status }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    };
    return res.status(200).json({ message: "User update success." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while updating the user." });
  }
};

//register user
async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.status(400).json({ message: "Please provide a valid name, email, and password." });
    };
    const userExists = await User.findOne({ name: name, email: email });
    if (userExists) {
      return res.status(400).json({ message: "That name and email address is already registered. Please choose a different name && email." });
    };
    const hashedpassword = await bcrypt.hashSync(password, 10);
    const user = await User.create({ name: name, email: email, password: hashedpassword, });
    if (!user) {
      return res.status(500).json({ message: "An error occurred while registering a user." });
    }
    return res.status(201).json({ message: "User created successfully." })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while registering a user." });
  }
};

//login User or get token
async function getToken(req, res) {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ message: "Please provide an email and password." });
    };
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    };
    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid password." });
    };
    if (!user.token) {
      const token = jsonwebtoken.sign({ _id: user._id }, JWT_SECREY_KEY);
      user.token = token;
      await user.save();
      return res.status(200).json({ token: token });
    };
    return res.status(200).json({ token: user.token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while signing the user." });
  }
};

//logout
async function deleteToken(req, res) {
  try {
    req.user.token = null;
    await req.user.save();
    res.status(200).json({ message: "The user has been successfully logged out." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while logging out." });
  }
};

module.exports = { getMyUser, getUser, getUsers, updateMyUser, updateUser, createUser, getToken, deleteToken };