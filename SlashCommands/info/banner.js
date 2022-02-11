const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'banner',
    description: 'Hiển thị ra banner người khác',
    options: [
        {
            name: 'tên_người_dùng',
            description: 'Tên người dùng hoặc id người dùng',
            type: 'USER',
            required: true
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const member = interaction.options.getUser('tên_người_dùng');

        axios.get(`https://discordapp.com/api/users/${member.id}`, {
            headers: {
                Authorization: `Bot ${client.config.token}`,
            }
            }).then((res) => {
                console.log(res.data)
                if(!res.data.banner) {
                    console.log(`${res.data.username} has no banner`)
                    message.reply({embeds: [
                        new MessageEmbed()
                        .setColor('RED')
                        .setDescription(`${res.data.username} không có bannner`)
                    ]})
                } else {
                    let banner = res.data.banner;
                    let url = banner.startsWith('a_') ? '.gif?size=4096' : '.png?size=4096';
                    url = `https://cdn.discordapp.com/banners/${member.id}/${banner}${url}`;

                    interaction.followUp({embeds: [
                       new MessageEmbed()
                        .setColor('GREEN')
                        .setTitle(`Banner của ${member.username}`)
                        .setDescription(`[Tải xuống tại đây](${url})`)
                        .setImage(url)
                    ]})
                }
            })
    }
}
