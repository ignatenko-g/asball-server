const Router = require('express');
const { matchController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const router = new Router();

router.get('/', matchController.getMatches);
router.get('/:id', matchController.getMatchById);
router.post('/', [authMiddleware], matchController.createMatch);
router.delete('/:id', [authMiddleware], matchController.deleteMatch);
router.patch('/:id', [authMiddleware], matchController.updateMatch);

module.exports = router;
