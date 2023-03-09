const bcrypt = require('bcrypt');
const prisma = require('../db/prisma');
const ApiError = require('../error/apiError');
const { UserDto } = require('../dtos');
const { tokenService } = require('./tokenService');

class UserService {
  async login(userData) {
    const userDto = new UserDto(userData);

    const user = await prisma.user.findUnique({
      where: {
        username: userDto.username,
      },
    });

    if (!user) {
      throw ApiError.BadRequest('Пользователь не найден!');
    }

    const isPassEquals = await bcrypt.compare(userDto.password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }

    const accessToken = tokenService.generateAccessToken({ id: user.id, username: user.username });

    return {
      accessToken,
    };
  }

  async getMe(userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw ApiError.BadRequest('Пользователь не найден!');
    }

    const accessToken = tokenService.generateAccessToken({ id: user.id, username: user.username });

    return {
      accessToken,
    };
  }
}

module.exports = {
  userService: new UserService(),
};
