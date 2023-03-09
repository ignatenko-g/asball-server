const Router = require('express');
const { teamController } = require('../controllers');
const { uploadMiddleware, authMiddleware } = require('../middlewares');

const router = new Router();

router.get('/', teamController.getTeams);
router.post('/', [authMiddleware, uploadMiddleware.single('img')], teamController.createTeam);
router.delete('/:id', [authMiddleware], teamController.deleteTeam);
router.patch('/:id', [authMiddleware, uploadMiddleware.single('img')], teamController.updateTeam);

module.exports = router;
