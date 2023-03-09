const prisma = require('../db/prisma');
const { LeagueDto } = require('../dtos');

class LeagueService {
  async getLeagues() {
    const leagues = await prisma.league.findMany();

    return leagues;
  }

  async createLeague(leagueData) {
    const leagueDto = new LeagueDto(leagueData);
    const createdLeague = await prisma.league.create({
      data: leagueDto,
    });

    return createdLeague;
  }

  async deleteLeague(id) {
    const deletedLeague = await prisma.league.delete({
      where: {
        id: +id,
      },
    });

    return deletedLeague;
  }

  async updateLeague(id, leagueData) {
    const leagueDto = new LeagueDto(leagueData);
    const updatedLeague = await prisma.league.update({
      where: {
        id: +id,
      },
      data: leagueDto,
    });

    return updatedLeague;
  }
}

module.exports = {
  leagueService: new LeagueService(),
};
