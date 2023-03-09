class UserDto {
  constructor(model) {
    this.username = model.username;
    this.password = model.password;
  }
}

module.exports = {
  UserDto,
};
