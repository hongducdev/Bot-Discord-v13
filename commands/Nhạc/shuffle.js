const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'shuffle',
    aliases: ['sl','tron'],
    category: 'Nhạc',
    utilisation: '{prefix}shuffle',
    voiceChannel: true,

    async run(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Không có nhạc đang phát ${message.author}... thử lại ? ❌`);

        if (!queue.tracks[0]) return message.channel.send(`Không có nhạc nào trong hàng đợi sau nhạc hiện tại ${message.author}... thử lại ? ❌`);

        await queue.shuffle();
        
        const embed = new MessageEmbed()
        .setAuthor('Xáo trộn thành công', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setColor('GREEN')
        .setFooter(`Bot: Bao-Chan Bot by PinkDuwc._`, message.author.avatarURL({ dynamic: true }))
        .setDescription(`Xáo trộn thành công **${queue.tracks.length}** bài hát ! ✅`)
        .setTimestamp()

        return message.channel.send({embeds : [embed]});
    },
};