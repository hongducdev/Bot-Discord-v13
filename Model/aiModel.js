const mongoose = require('mongoose');

module.exports = mongoose.model(
    'aiModel',
    new mongoose.Schema({
        guildId: String,
        channelId: String
    })
)