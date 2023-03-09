const asyncHandler = require('express-async-handler');
const { leagueService } = require('../services');

class LeagueController {
  getLeagues = asyncHandler(async (req, res, next) => {
    const leagues = await leagueService.getLeagues();

    res.json(leagues);
  });

  createLeague = asyncHandler(async (req, res, next) => {
    const createdLeague = await leagueService.createLeague(req.body);

    res.json(createdLeague);
  });

  deleteLeague = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedLeague = await leagueService.deleteLeague(id);

    res.json(deletedLeague);
  });

  updateLeague = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updatedLeague = await leagueService.updateLeague(id, req.body);

    res.json(updatedLeague);
  });
}

module.exports = {
  leagueController: new LeagueController(),
};
