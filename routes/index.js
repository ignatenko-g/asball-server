const Router = require('express');
const userRouter = require('./userRouter');
const leagueRouter = require('./leagueRouter');
const teamRouter = require('./teamRouter');
const channelRouter = require('./channelRouter');
const matchRouter = require('./matchRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/league', leagueRouter);
router.use('/team', teamRouter);
router.use('/channel', channelRouter);
router.use('/match', matchRouter);

module.exports = router;
