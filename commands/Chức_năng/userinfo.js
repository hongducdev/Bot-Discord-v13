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
    category: 'Chức_năng',
    aliases: ['user'],
    utilisation: '{prefix}userinfo',

    async run (client, message, args) {
        const member = message.mentions.members.first()|| message.guild.members.cache.get(args[0]) || message.member
		const roles = member.roles;
		const userFlags = member.user.flags.toArray();
		const embed = new MessageEmbed()
            .setAuthor('Thông tin server', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || 'GREEN')
            .addField("Tên người dùng", "\`" + member.user.tag + "\`", true)
            .addField("ID", "\`" + member.id + "\`", true)
            .addField('Tham gia Discord:', "\`"+moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`",true)
            .addField("Tham gia Server:", "\`"+moment(member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.joinedTimestamp).format("hh:mm:ss")+ "\`",true)
            .addField('Flags:',`\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Trống'}\``,true)
            .addField('Số Role:',`\`${roles.cache.size}\``,true)
            .addField('Role cao nhất:',`${member.roles.highest.id === message.guild.id ? 'Trống' : member.roles.highest}`,true)
            .addField('Quyền:',`${message.member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
		return message.channel.send({ embeds: [embed] });
    }
}