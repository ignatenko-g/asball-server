const prisma = require('../db/prisma');
const { TeamDto } = require('../dtos');

class TeamService {
  async getTeams() {
    const teams = await prisma.team.findMany({
      include: {
        league: true,
      },
    });

    return teams;
  }

  async createTeam(teamData, images) {
    const teamDto = new TeamDto(teamData);

    const createdTeam = await prisma.team.create({
      data: {
        name: teamDto.name,
        league: {
          connect: {
            id: +teamDto.leagueId,
          },
        },
        images,
      },
      include: {
        league: true,
      },
    });

    return createdTeam;
  }

  async deleteTeam(id) {
    const deletedTeam = await prisma.team.delete({
      where: {
        id: +id,
      },
    });

    return deletedTeam;
  }

  async updateTeam(id, teamData) {
    const teamDto = new TeamDto(teamData);

    const updatedTeam = await prisma.team.update({
      where: {
        id: +id,
      },
      data: teamData,
      include: {
        league: true,
      },
    });

    return updatedTeam;
  }

  async getTeamByName(name) {
    const foundTeam = await prisma.team.findUnique({
      where: {
        name,
      },
    });

    return foundTeam;
  }
}

module.exports = {
  teamService: new TeamService(),
};
