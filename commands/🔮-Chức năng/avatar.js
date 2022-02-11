const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    category: '🔮-Chức năng',
    aliases: ['ava'],
    utilisation: '{prefix}avatar',
    usage: '%avatar [tag/id người khác]',
    descriptions: 'Hiển thị ra avatar người khác',
    run (client, message, args) {
        const member = message.mentions.members.first()|| message.guild.members.cache.get(args[0]) || message.member
        const serverAvatar = member.avatar && `https://cdn.discordapp.com/guilds/${message.guild.id}/users/${member.id}/avatars/${member.avatar}.png?size=512`


        console.log(member.avatar)
        const embed = new MessageEmbed()
        .setAuthor('Bao-Chan Bot', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setTitle(`${member.displayName}'s avatar`)
        .setDescription(`[Tải xuống tại đây](${member.displayAvatarURL({dynamic: true, size: 1024})})`)
        .setImage(serverAvatar || member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(member.displayHexColor);
        if (serverAvatar) {
        embed.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        }
        message.channel.send({embeds: [embed]});
    }
}