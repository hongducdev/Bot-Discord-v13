const  { checkSameRoom, noMusicEmbed } = require('../../utils')
module.exports = {
    name: 'stop',
    category: 'music',
    aliases: ['leave'],
    description: 'Tắt nhạc',
    run: async(client, message, args) => {
        if (checkSameRoom(message)) return;
        const queue = client.player.getQueue(message.guild.id);
        if (queue) queue.destroy();
    }
}