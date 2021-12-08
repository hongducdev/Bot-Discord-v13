const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const { token } = require('../../config.json')

module.exports = {
    name: 'poker',
    category: 'Giải_trí_cùng_nhau',
    aliases: ['poker'],
    utilisation: '{prefix}poker',
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
                target_application_id: "755827207812677713",
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
                    .setDescription("I was unable to start a poker session.")
                    .setColor("#ff0000")
            )

            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`🚩 Poker Night:`)
                .setDescription(`\nDùng **Poker Night** giúp bạn có thể chơi Poker Night cùng bạn bè trong 🔊 Kênh thoại. Click vào *Tham gia Poker Night* để tham gia.\n[\n**Tham gia Poker Night**](https://discord.gg/${invite.code})`)
                .setFooter(`⚠️ Poker Night chỉ hoạt động trên desktop.`)
            message.channel.send({ embeds: [embed] })
        })
    }
}