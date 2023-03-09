const asyncHandler = require('express-async-handler');
const { userService } = require('../services');

class UserController {
  login = asyncHandler(async (req, res, next) => {
    const userData = await userService.login(req.body);

    return res.json(userData);
  });

  getMe = asyncHandler(async (req, res, next) => {
    const userData = await userService.getMe(req.user.id);

    return res.json(userData);
  });
}

module.exports = {
  userController: new UserController(),
};
