const { CommandInteraction, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { token } = require('../../config.json')

module.exports = {
    name: 'youtube',
    description: 'Bắt đầu hoạt động Youtube trong kênh thoại!',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
     run: async (client, interaction, args) => {
        const channel = interaction.member.voice.channel;

        if (!channel) return interaction.followUp(
            new MessageEmbed()
                .setDescription("Vui lòng kết nối kênh thoại !")
                .setColor('RED')
        )

        fetch(`https://discord.com/api/v9/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "880218394199220334",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if (!invite.code) return interaction.followUp(
                new MessageEmbed()
                    .setDescription("Bạn không thể bắt đầu hoạt động.")
                    .setColor('RED')
            )

            const ytembed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`🚩 Youtube Together:`)
                .setDescription(`\nDùng **Youtube Together** giúp bạn có thể xem Youtube cùng bạn bè trong 🔊 Kênh thoại. Click vào *Tham gia Youtube Together* để tham gia.\n[\n**Tham gia Youtube Together**](https://discord.gg/${invite.code})`)
                .setFooter(`⚠️ Youtube Together chỉ hoạt động trên desktop.`)
            interaction.followUp({ embeds: [ytembed] })
        })
    }
}