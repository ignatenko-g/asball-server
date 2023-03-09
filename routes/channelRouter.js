const Router = require('express');
const { channelController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const router = new Router();

router.get('/', channelController.getChannels);
router.post('/', [authMiddleware], channelController.createChannel);
router.delete('/:id', [authMiddleware, channelController.deleteChannel]);
router.patch('/:id', [authMiddleware], channelController.updateChannel);

module.exports = router;
