const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'simp',
    category: '🖼️-Hình ảnh',
    aliases: [],
    utilisation: '{prefix}simp',
    usage: '%simp [Id/tag người dùng]',
    descriptions: 'Làm Simp Card cho bản thân hoặc người khác',
    run (client, message, args) {
        let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;
        let url  = `http://api.no-api-key.com/api/v2/simpcard?image=${member.displayAvatarURL(
          { format: "jpg" }
        )}`
       const embed = new MessageEmbed()
        .setAuthor('Bao-Chan Bot', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setDescription(`[Tải Simp Card xuống tại đây](${url})`)
        .setImage(url)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(member.displayHexColor);
        message.channel.send({embeds: [embed]});
    }
}