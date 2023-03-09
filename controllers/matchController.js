const asyncHandler = require('express-async-handler');
const { matchService } = require('../services');

class MatchController {
  getMatches = asyncHandler(async (req, res, next) => {
    const params = {};

    if (req.query.top) {
      params.top = req.query.top === 'true';
    }

    if (req.query.date) {
      params.date = req.query.date;
    }

    const matches = await matchService.getMatches(params);

    res.json(matches);
  });

  getMatchById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const match = await matchService.getMatchById(id);

    return res.json(match);
  });

  createMatch = asyncHandler(async (req, res, next) => {
    const createdMatch = await matchService.createMatch(req.body);

    res.json(createdMatch);
  });

  deleteMatch = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedMatch = await matchService.deleteMatch(id);

    res.json(deletedMatch);
  });

  updateMatch = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updatedMatch = await matchService.updateMatch(id, req.body);

    res.json(updatedMatch);
  });
}

module.exports = {
  matchController: new MatchController(),
};
