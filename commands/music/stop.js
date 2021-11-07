const  { checkSameRoom, noMusicEmbed } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'stop',
    category: 'music',
    aliases: ['leave'],
    description: 'Tắt nhạc',
    run: async(client, message, args) => {
        if (checkSameRoom(message)) return;
        const queue = client.player.getQueue(message.guild.id);
        const stopEmbed = new MessageEmbed()
            .setColor ('GREEN')
            .setDescription(`**Đặc Vụ Con Mèo đi đây!**`)
        if (queue) {
            message.reply({embeds  : [stopEmbed]});
            queue.destroy();
        }
        
    }
}
