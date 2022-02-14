const { MessageEmbed } = require('discord.js');
const axios = require('axios');
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
    description: 'Thông tin về một người dùng',
    category: '🔮-Chức năng',
    aliases: ['user', 'ui'],
    usage: '<@user>',
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || 
        message.guild.members.cache.get(args[0]) || message.author

        axios.get(`http://www.sagiri-fansub.tk/api/v1/userinfo/${user.id}`)
        .then(res => {
            const data = res.data.data;
            const userFlags = data.flags;

            const embed = new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: `Thông tin về người dùng: ${data.tag}`, iconURL: data.displayAvatarURL})
            .setThumbnail(data.displayAvatarURL)
            .addField('Tên', `${message.guild.members.cache.get(data.id)}`, true)
            .addField(`ID`, `${user.id}`, true)
            .addField(`Huy hiệu`, `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Trống'}`, true)
            .addField(`Loại tài khoản`, `${data.bot ? 'Bot' : 'Người dùng'}`, true)
            if(data.premium_since !== null) {
                embed.addField(`Nitro`, `<t:${parseInt(data.premium_since /1000)}:F>`, true)
            } else {
                embed.addField(`Nitro`, 'Không', true)
            }
            embed.addField(`Giới thiệu`, `${data.bio}`, false)
            embed.addField(`Tham gia Discord`, `<t:${parseInt(data. createdTimestamp /1000)}:F>(<t:${parseInt(data. createdTimestamp /1000)}:R>)`, false)
            if(message.guild.members.cache.get(args[0])) {
                embed.addField(`Tham gia Server`, `<t:${parseInt(message.guild.members.cache.get(args[0]).joinedTimestamp /1000)}:F>(<t:${parseInt(message.guild.members.cache.get(args[0]).joinedTimestamp /1000)}:R>)`, false)
                embed.addField(`Vai trò`, `${message.guild.members.cache.get(args[0]).roles.cache.map(role => role.name).join(', ').replace("@everyone", " ")}`, false)
            } else {
                embed.addField(`Tham gia Server`, `<t:${parseInt(message.guild.members.cache.get(user.id).joinedTimestamp /1000)}:F>(<t:${parseInt(message.guild.members.cache.get(user.id).joinedTimestamp /1000)}:R>)`, false)
                embed.addField(`Vai trò`, `${message.guild.members.cache.get(user.id).roles.cache.map(role => role.name).join(', ').replace("@everyone", " ")}`, false)
            }
            if(data.banner !== null) {
                let banner = data.banner;
                let url = banner.startsWith('a_') ? '.gif?size=4096' : '.png?size=4096';
                url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${url}`;
                embed.setImage(url);
            }
            message.reply({embeds: [embed]});
        })
    }
}
