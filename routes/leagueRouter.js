const Router = require('express');
const { leagueController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const router = new Router();

router.get('/', leagueController.getLeagues);
router.post('/', [authMiddleware], leagueController.createLeague);
router.delete('/:id', [authMiddleware], leagueController.deleteLeague);
router.patch('/:id', [authMiddleware], leagueController.updateLeague);

module.exports = router;
