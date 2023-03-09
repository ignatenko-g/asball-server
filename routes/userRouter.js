const Router = require('express');
const { userController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const router = new Router();

router.post('/login', userController.login);
router.get('/me', [authMiddleware], userController.getMe);

module.exports = router;
