const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'avatar',
    category: 'user',
    aliases: ['ava'],
    run (client, message, args) {
        const member = message.mentions.members.first()|| message.guild.members.cache.get(args[0]) || message.member
            const URL = member.user.avatarURL({format: 'jpg', dynamic: true, size: 1024})
            const avatarEmbed = new MessageEmbed()
                .setColor ('GREEN')
                .setImage(URL)
                .setURL(URL)
                .setTitle('Download here')
            message.channel.send({ embeds: [avatarEmbed] });
    }
}