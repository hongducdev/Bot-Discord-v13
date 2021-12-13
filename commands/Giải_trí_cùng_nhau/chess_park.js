const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const { token } = require('../../config.json')

module.exports = {
    name: 'chess',
    category: 'Giải_trí_cùng_nhau',
    aliases: ['cờ_vua'],
    utilisation: '{prefix}chess',
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
                target_application_id: "832012774040141894",
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
                    .setDescription("I was unable to start a chess park session.")
                    .setColor("#ff0000")
            )

            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`🚩 Chess in the Park:`)
                .setDescription(`\nDùng **Chess in the Park** giúp bạn có thể chơi Chess in the Park cùng bạn bè trong 🔊 Kênh thoại. Click vào *Tham gia Chess in the Park* để tham gia.\n[\n**Tham gia Chess in the Park**](https://discord.gg/${invite.code})`)
                .setFooter(`⚠️ Chess in the Park chỉ hoạt động trên desktop.`)
            message.channel.send({ embeds: [embed] })
        })
    }
}
