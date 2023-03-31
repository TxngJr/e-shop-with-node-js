const express = require('express');
const router = express.Router();
const { checkToken } = require('../middlewares/tokenMiddleware');
const { checkStatus } = require('../middlewares/roleMiddleware');
const { getMyUser, getUser, getUsers, updateMyUser, updateUser, createUser, getToken, deleteToken } = require('../controllers/userController');

router.get('/', checkToken, getMyUser);
router.get('/:name', checkToken,checkStatus(['admin']), getUser);
router.get('/all-users', checkToken, checkStatus(['admin']), getUsers);
router.put('/edit-user',checkToken, updateMyUser);
router.put('/edit-user/:name',checkToken,checkStatus(['admin']), updateUser);
router.post('/register', createUser);
router.post('/login', getToken);
router.get('/logout', checkToken, deleteToken);

module.exports = router;