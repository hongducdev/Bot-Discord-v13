const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const { token } = require('../../config.json')

module.exports = {
    name: 'word',
    category: '🎲-Giải trí',
    aliases: ['ghép_từ','tu'],
    utilisation: '{prefix}word',
    usage: '%word',
    descriptions: 'Tham gia chơi ghép từ với mọi người trong kênh thoại',
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
                target_application_id: "879863976006127627",
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
                    .setDescription("I was unable to start a Word Snacks session.")
                    .setColor("#ff0000")
            )

            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`🚩 Word Snacks:`)
                .setDescription(`\nDùng **Word Snacks** giúp bạn có thể chơi Word Snacks cùng bạn bè trong 🔊 Kênh thoại. Click vào *Tham gia Word Snacks* để tham gia.\n[\n**Tham gia Word Snacks**](https://discord.gg/${invite.code})`)
                .setFooter(`⚠️ Word Snacks chỉ hoạt động trên desktop.`)
            message.channel.send({ embeds: [embed] })
        })
    }
}
