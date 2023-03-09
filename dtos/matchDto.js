class MatchDto {
  constructor(model) {
    this.homeTeamId = model.homeTeamId;
    this.awayTeamId = model.awayTeamId;
    this.top = model.top;
    this.date = model.date;
    this.leagueId = model.leagueId;
    this.channelId = model.channelId;
  }
}

module.exports = {
  MatchDto,
};
