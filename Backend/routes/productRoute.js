const express = require('express');
const router = express.Router();
const { checkToken } = require('../middlewares/tokenMiddleware');
// const { checkStatus } = require('../middlewares/roleMiddleware');
const { createProduct, getProduct,getsProduct } = require('../controllers/productController');
/*
router.get('/getusers', checkToken, checkStatus(['admin']), getUsers);
*/
router.post('/createproduct', checkToken,createProduct);
router.get('/getproduct/:name', checkToken, getProduct);
router.get('/getsproduct', checkToken,getsProduct);

module.exports = router;