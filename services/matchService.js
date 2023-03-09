const prisma = require('../db/prisma');
const { MatchDto } = require('../dtos');

class MatchService {
  async getMatches(params) {
    let start = new Date(params.date);
    let end = new Date(params.date);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const matches = await prisma.match.findMany({
      where: {
        top: params.top && params.top,
        date: params.date && {
          gte: start,
          lt: end,
        },
      },
      include: {
        channel: true,
        homeTeam: true,
        awayTeam: true,
        league: true,
      },
    });

    return matches;
  }

  async getMatchById(id) {
    const match = await prisma.match.findUnique({
      where: {
        id: +id,
      },
      include: {
        channel: true,
        homeTeam: true,
        awayTeam: true,
        league: true,
      },
    });

    return match;
  }

  async createMatch(matchData) {
    const matchDto = new MatchDto(matchData);
    const createdMatch = await prisma.match.create({
      data: {
        homeTeam: {
          connect: {
            id: +matchDto.homeTeamId,
          },
        },
        awayTeam: {
          connect: {
            id: +matchDto.awayTeamId,
          },
        },
        league: {
          connect: {
            id: +matchDto.leagueId,
          },
        },
        channel: {
          connect: {
            id: +matchDto.channelId,
          },
        },
        top: matchDto.top,
        date: matchDto.date,
      },
      include: {
        channel: true,
        homeTeam: true,
        awayTeam: true,
        league: true,
      },
    });

    return createdMatch;
  }

  async deleteMatch(id) {
    const deletedMatch = await prisma.match.delete({
      where: {
        id: +id,
      },
    });

    return deletedMatch;
  }

  async updateMatch(id, matchData) {
    const matchDto = new MatchDto(matchData);
    const updatedMatch = await prisma.match.update({
      where: {
        id: +id,
      },
      data: matchDto,
      include: {
        channel: true,
        homeTeam: true,
        awayTeam: true,
        league: true,
      },
    });

    return updatedMatch;
  }
}

module.exports = {
  matchService: new MatchService(),
};
