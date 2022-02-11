const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const { token } = require('../../config.json')

module.exports = {
    name: 'doodle',
    category: '🎲-Giải trí',
    aliases: ['vẽ','ve'],
    utilisation: '{prefix}doodle',
    usage: '%doodle',
    descriptions: 'Tham gia chơi game với mọi người trong kênh thoại',
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
                target_application_id: "878067389634314250",
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
                    .setDescription("I was unable to start a Doodle Crew session.")
                    .setColor("#ff0000")
            )

            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`🚩 Doodle Crew:`)
                .setDescription(`\nDùng **Doodle Crew** giúp bạn có thể chơi Doodle Crew cùng bạn bè trong 🔊 Kênh thoại. Click vào *Tham gia Doodle Crew* để tham gia.\n[\n**Tham gia Doodle Crew**](https://discord.gg/${invite.code})`)
                .setFooter(`⚠️ Doodle Crew chỉ hoạt động trên desktop.`)
            message.channel.send({ embeds: [embed] })
        })
    }
}
