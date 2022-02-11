const { MessageEmbed, CommandInteraction } = require('discord.js');
const moment = require("moment")

module.exports = {
    name: 'serverinfo',
    description: 'Hiển thị thông tin của server',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
     run: async (client, interaction, args) => {
        let boosts = interaction.guild.premiumSubscriptionCount;
        var boostlevel = 0;
        if (boosts >= 2) boostlevel = "1";
        if (boosts >= 7) boostlevel = "2";
        if (boosts >= 14) boostlevel = "3";

        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setThumbnail(interaction.guild.iconURL({dynamic: true}))
        .setTitle(`Thông tin của server ${interaction.guild.name}`)
        .addField(`**ID server**`, `${interaction.guild.id}`, true)
        .addField(`**Owner ID**`, `${interaction.guild.ownerId}`, true)
        .addField(`**Boosts/Levels Boost**`, `${boosts} / ${boostlevel}`, true)
        .addField(`**Ngày tạo**`, `${moment(interaction.guild.createdTimestamp).format("DD/MM/YYYY")} (<t:${parseInt(interaction.guild.createdTimestamp /1000)}:R>)`, true)
        .addField(`**Kênh Văn Bản**`, `${interaction.guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT").size}`, true)
        .addField(`**Kênh Thoại**`, `${interaction.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").size}`, true)
        .addField(`**Số Thành Viên**`, `${interaction.guild.memberCount}`, true)
        .addField(`**Số Roles**`, `${interaction.guild.roles.cache.size}`, true)
        .addField(`**Số Emojis**`,`${interaction.guild.emojis.cache.size}`, true)

        

        return interaction.followUp({embeds: [embed]})
    }
}