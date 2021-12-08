const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const { token } = require('../../config.json')

module.exports = {
    name: 'betra',
    category: 'Giải_trí_cùng_nhau',
    aliases: ['betra'],
    utilisation: '{prefix}betra',
    run: async (client, message, args) => {
        const channel = message.member.voice.channel

        if (!channel) return message.channel.send(
            new MessageEmbed()
                .setDescription("Vui lòng kết nối kênh thoại !")
                .setColor("#ff0000")
        )

        fetch(`https://discord.com/api/v9/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "773336526917861400",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if (!invite.code) return message.channel.send(
                new MessageEmbed()
                    .setDescription("I was unable to start a betrayal session.")
                    .setColor("#ff0000")
            )

            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`🚩 Betrayal.io:`)
                .setDescription(`\nDùng **Betrayal.io** giúp bạn có thể chơi Betrayal.io cùng bạn bè trong 🔊 Kênh thoại. Click vào *Tham gia Betrayal.io* để tham gia.\n[\n**Tham gia Betrayal.io**](https://discord.gg/${invite.code})`)
                .setFooter(`⚠️ Betrayal.io chỉ hoạt động trên desktop.`)
            message.channel.send({ embeds: [embed] })
        })
    }
}