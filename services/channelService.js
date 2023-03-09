const prisma = require('../db/prisma');
const { ChannelDto } = require('../dtos');

class ChannelService {
  async getChannels() {
    const channels = await prisma.channel.findMany();

    return channels;
  }

  async createChannel(channelData) {
    const channelDto = new ChannelDto(channelData);
    const createdChannel = await prisma.channel.create({
      data: channelDto,
    });

    return createdChannel;
  }

  async deleteChannel(id) {
    const deletedChannel = await prisma.channel.delete({
      where: {
        id: +id,
      },
    });

    return deletedChannel;
  }

  async updateChannel(id, channelData) {
    const channelDto = new ChannelDto(channelData);
    const updatedChannel = await prisma.channel.update({
      where: {
        id: +id,
      },
      data: channelDto,
    });

    return updatedChannel;
  }
}

module.exports = {
  channelService: new ChannelService(),
};
