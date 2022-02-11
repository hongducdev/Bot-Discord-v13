const { MessageEmbed , CommandInteraction } = require("discord.js");
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
    name: 'userinfo-global',
    description: 'Hiển thị thông tin của người dùng',
    options: [
        {
            name: 'id_người_dùng',
            description: 'ID của người dùng',
            type: 'USER',
            required: true,
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const Target = interaction.options.getUser('id_người_dùng');
        const userFlags = Target.flags.toArray();

        console.log(interaction.options.getUser('id_người_dùng').username)
        console.log(interaction.options.getUser('id_người_dùng').id)
        console.log(interaction.options.getUser('id_người_dùng').createdAt)
        console.log(interaction.options.getUser('id_người_dùng').flags.toArray())

        axios.get(`https://discordapp.com/api/users/${Target.id}`, {
            headers: {
                Authorization: `Bot ${client.config.token}`,
            }
            }).then((res) => {
                console.log(res.data)
                if(!res.data.banner) {
                    console.log(`${res.data.username} has no banner`);
                    const embed = new MessageEmbed()
                    .setColor('GREEN')
                    .setThumbnail(interaction.options.getUser('id_người_dùng').displayAvatarURL({dynamic: true}))
                    .setColor('GREEN')
                    .addField(`**Tên người dùng**`,`${interaction.options.getUser('id_người_dùng').username}`, true)
                    .addField(`**ID người dùng**`,`${interaction.options.getUser('id_người_dùng').id}`,true)
                    .addField(`**Flag**`,`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Trống'}`,true)
                    .addField(`**Tham gia Discord**`, `<t:${parseInt(Target.createdAt /1000)}:F>(<t:${parseInt(Target.createdAt /1000)}:R>)`, true)
                    .setTimestamp()
                    interaction.followUp({embeds: [embed]})
                } else {
                    let banner = res.data.banner;
                    let url = banner.startsWith('a_') ? '.gif?size=4096' : '.png?size=4096';
                    console.log(`https://cdn.discordapp.com/banners/${Target.id}/${banner}${url}`);
                    url = `https://cdn.discordapp.com/banners/${Target.id}/${banner}${url}`;
                    const embedBanner = new MessageEmbed()
                    .setColor('GREEN')
                    .setThumbnail(interaction.options.getUser('id_người_dùng').displayAvatarURL({dynamic: true}))
                    .setColor('GREEN')
                    .addField(`**Tên người dùng**`,`${interaction.options.getUser('id_người_dùng').username}`, true)
                    .addField(`**ID người dùng**`,`${interaction.options.getUser('id_người_dùng').id}`,true)
                    .addField(`**Flag**`,`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Trống'}`,true)
                    .addField(`**Tham gia Discord**`, `<t:${parseInt(Target.createdAt /1000)}:F>(<t:${parseInt(Target.createdAt /1000)}:R>)`, true)
		    .setImage(url)
                    .setTimestamp()
                    interaction.followUp({embeds: [embedBanner]})
                }
            }).catch((err) => {
                console.log(err)
            })
    }
}
