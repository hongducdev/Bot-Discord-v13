const { MessageEmbed } = require('discord.js');
const moment = require("moment")
const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};


module.exports = {
    name: 'userinfo',
    category: '🔮-Chức năng',
    aliases: ['user'],
    utilisation: '{prefix}userinfo',
	usage: '%userinfo [ID/tag người dùng khác]',
    descriptions: 'Hiển thi thông tin người dùng Discord',

    async run (client, message, args) {
        const target = message.mentions.users.first() || message.author
        const member = message.guild.members.cache.get(target.id)
        const userFlags = member.user.flags.toArray();
        const roles = member.roles;

        const embed = new MessageEmbed()
        .setAuthor(`${target.username}`,target.displayAvatarURL({dynamic: true}))
        .setThumbnail(target.displayAvatarURL({dynamic: true}))
        .setColor(target.displayHexColor)
        .addField(`**Tên người dùng**`,`\`${member.user.tag}\``, true)
        .addField(`**ID người dùng**`,`\`${target.id}\``,true)
        .addField(`**Flag**`,`\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Trống'}\``,true)
        .addField(`**Roles[${roles.cache.size - 1 }]**`,`${member.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`)
	    .addField(`**Tham gia server**`, `<t:${parseInt(member.joinedAt /1000)}:F>(<t:${parseInt(member.joinedAt /1000)}:R>)`, true)
        .addField(`**Tham gia Discord**`, `<t:${parseInt(target.createdAt /1000)}:F>(<t:${parseInt(target.createdAt /1000)}:R>)`, true)
        .setFooter(` Yêu cầu bởi: ${message.member.displayName}`, message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
		return message.channel.send({ embeds: [embed] });
    }
}
