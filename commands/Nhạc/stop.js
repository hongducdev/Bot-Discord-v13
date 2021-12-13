const  { checkSameRoom, noMusicEmbed } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'stop',
    category: 'Nhạc',
    aliases: ['leave'],
    description: 'Tắt nhạc',
    async run(client, message, args) {
        if (checkSameRoom(message)) return;
        const queue = client.player.getQueue(message.guild.id);
        const stopEmbed = new MessageEmbed()
            .setColor ('ORANGE')
            .setTitle(`Đã ngắt kết nối...`)
            .setDescription(`**Bao-Chan Bot đi đây, hẹn gặp ${message.author} sau nha!**`)
            .setTimestamp()
            .setFooter('Bot: Bao-Chan Bot by PinkDuwc._', message.author.avatarURL({ dynamic: true }));
        if (queue || !queue.playing) {
            message.reply({embeds  : [stopEmbed]});
            queue.destroy(true);
        }
        
    }
}
