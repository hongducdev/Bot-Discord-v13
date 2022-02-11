const { CommandInteraction, MessageEmbed } = require('discord.js')
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
    name: "userinfo",
    description: "Hiển thị thông tin người dùng",
    options:[
        {
            name: "tên_người_dùng",
            description: "Nhập tên người dùng hoặc ID",
            type: "USER",
            required: true,
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
     run: async (client, interaction, args) => {
        const Target = interaction.options.getMember('tên_người_dùng');
        const userFlags = Target.user.flags.toArray();

        axios.get(`https://discordapp.com/api/users/${Target.id}`, {
            headers: {
                Authorization: `Bot ${client.config.token}`,
            }
            }).then((res) => {
                console.log(res.data)
                if(!res.data.banner) {
                    console.log(`${res.data.username} has no banner`)
                    const embed = new MessageEmbed()
                    .setThumbnail(Target.displayAvatarURL({dynamic: true}))
                    .setColor(Target.displayHexColor)
                    .addField(`**Tên người dùng**`,`${Target.user.tag}`, true)
                    .addField(`**ID người dùng**`,`${Target.id}`,true)
                    .addField(`**Flag**`,`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Trống'}`,true)
                    .addField(`**Roles**`,`${Target.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`)
                    .addField(`**Tham gia server**`, `<t:${parseInt(Target.joinedAt /1000)}:F>(<t:${parseInt(Target.joinedAt /1000)}:R>)`, true)
                    .addField(`**Tham gia Discord**`, `<t:${parseInt(Target.user.createdAt /1000)}:F>(<t:${parseInt(Target.user.createdAt /1000)}:R>)`, true)
                    interaction.followUp({embeds: [embed]});
                } else {
                    let banner = res.data.banner;
                    let url = banner.startsWith('a_') ? '.gif?size=4096' : '.png?size=4096';
                    url = `https://cdn.discordapp.com/banners/${Target.id}/${banner}${url}`;

                    const embedBanner = new MessageEmbed()
                    .setThumbnail(Target.displayAvatarURL({dynamic: true}))
                    .setColor(Target.displayHexColor)
                    .addField(`**Tên người dùng**`,`${Target.user.tag}`, true)
                    .addField(`**ID người dùng**`,`${Target.id}`,true)
                    .addField(`**Flag**`,`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Trống'}`,true)
                    .addField(`**Roles**`,`${Target.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`)
                    .addField(`**Tham gia server**`, `<t:${parseInt(Target.joinedAt /1000)}:F>(<t:${parseInt(Target.joinedAt /1000)}:R>)`, true)
                    .addField(`**Tham gia Discord**`, `<t:${parseInt(Target.user.createdAt /1000)}:F>(<t:${parseInt(Target.user.createdAt /1000)}:R>)`, true)
                    .setImage(url)
                    interaction.followUp({embeds: [embedBanner]});
                }
            })
    }
}
