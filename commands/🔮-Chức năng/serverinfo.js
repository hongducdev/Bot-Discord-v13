const { MessageEmbed } = require('discord.js');
const moment = require("moment")

module.exports = {
    name: 'serverinfo',
    category: '🔮-Chức năng',
    aliases: ['server'],
    utilisation: '{prefix}serverinfo',
    usage: '%serverinfo',
    descriptions: 'Hiển thị thông tin của server',

    async run (client, message, args) {

        let boosts = message.guild.premiumSubscriptionCount;
        var boostlevel = 0;
        if (boosts >= 2) boostlevel = "1";
        if (boosts >= 7) boostlevel = "2";
        if (boosts >= 14) boostlevel = "3 / ∞";

        const embed = new MessageEmbed()
        .setAuthor('Thông tin server', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .addField("Owner", `\`${(await message.client.users.fetch(message.guild.ownerId)).tag}\``, true)
        .addField("Số Boosts", "\`" + message.guild.premiumSubscriptionCount + "\`", true)
        .addField("Boost-Level", "\`" + boostlevel + "\`", true)
        .addField("Ngày tạo:", "\`" + moment(message.guild.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(message.guild.createdTimestamp).format("hh:mm:ss") +"`", true)

        .addField("Số kênh", "\`" + message.guild.channels.cache.size + "\`", true)
        .addField("Kênh Văn Bản", "\`" + message.guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT").size + "\`", true)
        .addField("Kênh Thoại", "\`" + message.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").size + "\`", true)

        .addField("Số thành viên:", "\`" + message.guild.memberCount + "\`", true)
  

        .addField("Emojis: ", "\`" + message.guild.emojis.cache.size + "\`", true)
        .addField("Roles: ", "\`" + message.guild.roles.cache.size + "\`", true)
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('GREEN');

        message.reply ({embeds: [embed]})
    }
}