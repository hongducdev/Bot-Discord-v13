const client = require("../index");
// const db = require('quick.db');
const axios = require('axios');
const aiModel = require('../Model/aiModel');

client.on('messageCreate', async (message) => {

    const aichan = await aiModel.find({
        guildId: message.guild.id,
        channelId: message.channel.id
    })

    const ai = aichan.map((aichannelId) => {
        const aichanId = message.guild.channels.cache.get(aichannelId.channelId);
        if (message.author.bot) return;
        if(!message.content.startsWith(client.config.prefix)) {
            if (message.channel.id == aichannelId.channelId) {
                axios.get(`https://api-sv2.simsimi.net/v2/?text=${encodeURIComponent(message.content)}&lc=vn`)
                .then((res) => {
                    console.log(res.data.success);
                    message.reply(res.data.success);
                })
            }
        }
    });
})