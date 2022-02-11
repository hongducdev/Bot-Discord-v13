const { Client, MessageEmbed, ContextInteraction } = require("discord.js");
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
	VERIFIED_DEVELOPER: 'Verified Bot Developer',
    EARLY_VERIFIED_BOT_DEVELOPER: 'Early Verify Bot Developer',

};

module.exports = {
    name: "Userinfo",
    description: "Hiển thị thông tin của người dùng",
    type: 'USER',
    /**
     * @param {Client} client
     * @param {ContextInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const target = await interaction.guild.members.fetch(interaction.targetId);
	    console.log(interaction.targetId);
        console.log(target.user.username);
        console.log(target.joinedAt);
        const userFlags = target.user.flags.toArray();

        axios.get(`https://discordapp.com/api/users/${target.id}`, {
            headers: {
                Authorization: `Bot ${client.config.token}`,
            }
            }).then((res) => {
                console.log(res.data)
                if(!res.data.banner) {
                    console.log(`${res.data.username} has no banner`)
		    const embedNoBanner = new MessageEmbed()
                    .setColor('GREEN')
                    .setThumbnail(target.displayAvatarURL({dynamic: true, size: 1024}))
                    .addField(`**Tên người dùng**`,`${target.user.tag}`, true)
                    .addField(`**ID**`,`${target.id}`, true)
                    .addField(`**Flag**`,`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Trống'}`,true)
                    .addField(`**Roles**`,`${target.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`)
                    .addField(`**Tham gia server**`, `<t:${parseInt(target.joinedTimestamp /1000)}:F>(<t:${parseInt(target.joinedTimestamp /1000)}:R>)`, true)
                    .addField(`**Tham gia Discord**`, `<t:${parseInt(target.user.createdTimestamp /1000)}:F>(<t:${parseInt(target.user.createdTimestamp /1000)}:R>)`, true)
                    return interaction.followUp({embeds: [embedNoBanner]});
                } else {
                    let banner = res.data.banner;
                    let url = banner.startsWith('a_') ? '.gif?size=4096' : '.png?size=4096';
                    console.log(`https://cdn.discordapp.com/banners/${target.id}/${banner}${url}`);
                    url = `https://cdn.discordapp.com/banners/${target.id}/${banner}${url}`;
                    const embed = new MessageEmbed()
                    .setColor('GREEN')
                    .setThumbnail(target.displayAvatarURL({dynamic: true, size: 1024}))
                    .addField(`**Tên người dùng**`,`${target.user.tag}`, true)
                    .addField(`**ID**`,`${target.id}`, true)
                    .addField(`**Flag**`,`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Trống'}`,true)
                    .addField(`**Roles**`,`${target.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`)
                    .addField(`**Tham gia server**`, `<t:${parseInt(target.joinedTimestamp /1000)}:F>(<t:${parseInt(target.joinedTimestamp /1000)}:R>)`, true)
                    .addField(`**Tham gia Discord**`, `<t:${parseInt(target.user.createdTimestamp /1000)}:F>(<t:${parseInt(target.user.createdTimestamp /1000)}:R>)`, true)
                    .setImage(url)
                    return interaction.followUp({embeds: [embed]});
                }
            }).catch((err) => {
                console.log(err)
            })
    },
};
