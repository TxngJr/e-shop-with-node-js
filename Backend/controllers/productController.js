const Product = require('../models/productModel');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const JSONWEBTOKENSECREYKEY = 'asdfghjk';

async function getProduct(req, res) {
    try{
        const {name} = req.params;
        const product = await Product.findOne({name: name});
        if(!product){
            return res.status(400).json({"message": "Please provide a valid not found this product."})
        }
        return res.status(200).json({product});
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "An error occurred while get the Product." });
    }
};

async function getsProduct(req, res) {
  try {
    const products = await Product.find({});
    return res.status(200).json({ products })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while gets the Product." });
  }
}

async function createProduct(req, res) {
    try {
        const { name, price, description, category, image } = req.body;
        if (!(name && price && description && category && image)) {
            return res.status(400).json({ "message": "Please provide a valid name, price, description, catergory, image." })
        };
        const productExists = await Product.findOne({ name: name, price: price, description: description, category: category, image: image });
        if (productExists) {
            return res.status(400).json({ message: "That Product is already registered. Please choose a different Product." });
        };
        const product = new Product({
            name: name,
            price: price,
            description: description,
            category: category,
            image: image,
        });
        await product.save();
        return res.status(201).json({ message: "Product created successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while creating the Product." });
    }
};
/*
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
      const token = jsonwebtoken.sign({ userId: user._id }, JSONWEBTOKENSECREYKEY);
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
*/
module.exports = { createProduct, getProduct, getsProduct };