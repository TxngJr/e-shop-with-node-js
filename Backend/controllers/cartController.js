const Cart = require('../models/cart');
const Product = require('../models/product');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // create a new cart if the user doesn't have one
      cart = await new Cart({ user: userId, products: [] }).save();
    }

    // check if the product already exists in the cart
    const existingProduct = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (existingProduct) {
      // update the quantity if the product already exists
      existingProduct.quantity += quantity;
    } else {
      // add the product to the cart if it doesn't exist
      cart.products.push({ product: productId, quantity });
    }

    // update the total value of the cart
    cart.total += quantity * product.price;

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // find the index of the product in the cart array
    const index = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (index !== -1) {
      const { price, quantity } = cart.products[index];

      // update the total value of the cart
      cart.total -= price * quantity;

      // remove the product from the cart array
      cart.products.splice(index, 1);

      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('products.product');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
