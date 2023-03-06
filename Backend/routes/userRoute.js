const express = require('express');
const router = express.Router();
const { checkToken } = require('../middlewares/tokenMiddleware');
const { checkStatus } = require('../middlewares/roleMiddleware');
const { getUser, getUsers, createUser, getToken, deleteToken, banUser } = require('../controllers/userController');

router.get('/getuser', checkToken, getUser);
router.get('/getusers', checkToken, checkStatus(['admin']), getUsers);
router.post('/createuser', createUser);
router.post('/gettoken', getToken);
router.get('/deletetoken', checkToken, deleteToken);
router.put('/banuser/:userId', checkToken, checkStatus(['admin']), banUser);

module.exports = router;