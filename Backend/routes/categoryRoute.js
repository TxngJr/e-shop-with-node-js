const express = require('express');
const router = express.Router();
const { checkToken } = require('../middlewares/tokenMiddleware');
const { checkStatus } = require('../middlewares/roleMiddleware');
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.get('/get-all-categories', getAllCategories);
router.post('/create-category', createCategory);
router.get('/get-category/:categoryId', getCategoryById);
router.put('/update-category/:categoryId', updateCategory);
router.delete('/delete-category/:categoryId', deleteCategory);

module.exports = router;