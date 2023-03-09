const asyncHandler = require('express-async-handler');
const path = require('path');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const ApiError = require('../error/apiError');
const { teamService } = require('../services');

class TeamController {
  getTeams = asyncHandler(async (req, res, next) => {
    const teams = await teamService.getTeams();

    return res.json(teams);
  });

  createTeam = asyncHandler(async (req, res, next) => {
    const filePath = req.file ? req.file.path.replace('\\', '/') : '';
    const filename = req.file && req.file.filename;
    const fileExt = req.file && path.parse(req.file.filename).ext;
    const foundedTeam = await teamService.getTeamByName(req.body.name);

    if (foundedTeam) {
      if (filename) {
        fs.unlink(path.resolve(__dirname, '..', 'uploads', filename), function (error) {
          return next(error);
        });
      }

      return next(ApiError.BadRequest('Такая команда уже существует!'));
    }

    let images = {};

    if (filePath) {
      let small = uuidv4() + fileExt;
      let medium = uuidv4() + fileExt;
      let main = filename;

      sharp(filePath)
        .resize({
          width: 26,
          height: 26,
        })
        .toFile(path.resolve(__dirname, '..', 'uploads', small));

      sharp(filePath)
        .resize({
          width: 70,
          height: 70,
        })
        .toFile(path.resolve(__dirname, '..', 'uploads', medium));

      images = {
        main,
        medium,
        small,
      };
    }

    const createdTeam = await teamService.createTeam(req.body, images);

    return res.json(createdTeam);
  });

  deleteTeam = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedTeam = await teamService.deleteTeam(id);

    if (deletedTeam.images) {
      for (let key of Object.keys(deletedTeam.images)) {
        fs.unlink(
          path.resolve(__dirname, '..', 'uploads', deletedTeam.images[key]),
          function (error) {
            console.log(error);
          }
        );
      }
    }

    res.json(deletedTeam);
  });

  updateTeam = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updatedTeam = await teamService.updateTeam(id, req.body);

    res.json(updatedTeam);
  });
}

module.exports = {
  teamController: new TeamController(),
};
