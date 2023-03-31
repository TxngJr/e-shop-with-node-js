const express = require('express');
const router = express.Router();
const { checkToken } = require('../middlewares/tokenMiddleware');
const { checkStatus } = require('../middlewares/roleMiddleware');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.get('/getsproducts', getProducts);
router.post('/createproduct', createProduct);
router.get('/getproduct/:productId', getProductById);
router.put('/updateproduct/:productId', updateProduct);
router.delete('/deleteproduct/:productId', deleteProduct);

module.exports = router;