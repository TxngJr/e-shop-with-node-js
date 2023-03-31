const Product = require('../models/productModel');

// Get all products
exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.status(200).json(products);
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching products failed!'
      });
    });
};

// Get single product by ID
exports.getProductById = (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({
          message: 'Product not found!'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching product failed!'
      });
    });
};

// Create a new product
exports.createProduct = (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image
  });
  product.save()
    .then(result => {
      res.status(201).json({
        message: 'Product created successfully!',
        product: result
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating a product failed!'
      });
    });
};

// Update an existing product
exports.updateProduct = (req, res, next) => {
  const product = new Product({
    _id: req.params.productId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image
  });
  Product.updateOne({ _id: req.params.productId }, product)
    .then(result => {
      res.status(200).json({
        message: 'Product updated successfully!',
        product: result
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Updating product failed!'
      });
    });
};

// Delete a product
exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.productId })
    .then(result => {
      res.status(200).json({
        message: 'Product deleted successfully!'
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Deleting product failed!'
      });
    });
};
