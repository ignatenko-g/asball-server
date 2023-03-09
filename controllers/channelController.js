const asyncHandler = require('express-async-handler');
const { channelService } = require('../services');

class ChannelController {
  getChannels = asyncHandler(async (req, res, next) => {
    const channels = await channelService.getChannels();

    res.json(channels);
  });

  createChannel = asyncHandler(async (req, res, next) => {
    const createdChannel = await channelService.createChannel(req.body);

    res.json(createdChannel);
  });

  deleteChannel = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedChannel = await channelService.deleteChannel(id);

    res.json(deletedChannel);
  });

  updateChannel = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updatedChannel = await channelService.updateChannel(id, req.body);

    res.json(updatedChannel);
  });
}

module.exports = {
  channelController: new ChannelController(),
};
