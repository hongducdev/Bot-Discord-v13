const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'baka',
    category: '🧸-Reactions',
    aliases: [],
    usage: '%baka',
    descriptions: 'Baka baka baka!',
    run: async (client, message, args) => {
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đợi mình tí mình đang tìm...', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        let searching = await message.channel.send({embeds: [searchEmbed]})

        const url = await fetch(`https://nekos.life/api/v2/img/baka`)
        const data = await url.json()
        .then(data=> {
            //không trả về thì gửi về embed lỗi
            const noData = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh!`)
            if(!data) return searching.edit({embeds : [noData]})

            //nếu có thì trả về ảnh
            const imageEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor('Reaction: Baka',client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setImage(data.url)
            .setTimestamp()
            .setFooter(`Bot: Bao-Chan Bot by PinkDuwc._`, client.user.displayAvatarURL)
            
            return searching.edit({embeds: [imageEmbed]})
        })
    }
}
