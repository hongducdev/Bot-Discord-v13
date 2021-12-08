const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'avatar',
    category: 'Chức_năng',
    aliases: ['ava'],
    utilisation: '{prefix}avatar',
    run (client, message, args) {
        const member = message.mentions.members.first()|| message.guild.members.cache.get(args[0]) || message.member
            const URL = member.user.avatarURL({format: 'jpg', dynamic: true, size: 1024})
            const avatarEmbed = new MessageEmbed()
                .setAuthor('Avatar Discord', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
                .setColor ('GREEN')
                .setImage(URL)
                .setURL(URL)
                .setTitle('Tải xuống tại đây')
                .setTimestamp()
                .setFooter(`Bot: Bao-Chan Bot by PinkDuwc._`, message.author.avatarURL({ dynamic: true }))
            message.channel.send({ embeds: [avatarEmbed] });
    }
}