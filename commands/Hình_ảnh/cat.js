const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'cat',
    category: 'Hình_ảnh',
    aliases: ['meo'],
    utilisation: '{prefix}meo',
    run: async (client, message, args) => {
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đang tìm kiếm, vui lòng đợi...', 'https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
        let searching = await message.channel.send({embeds: [searchEmbed]})
        const url = await fetch(`https://some-random-api.ml/animal/cat`)
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
            .setAuthor('Thông tin server', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setURL(data.url)
            .setDescription(`**Tiêu đề:** ${data.fact}\n [Tải xuống ở đây](${data.image})`)
            .setImage(data.image)
            .setTimestamp()
            .setFooter(`Bot: Bao-Chan Bot by PinkDuwc._`, client.user.displayAvatarURL)
            
            return searching.edit({embeds: [imageEmbed]})
        })
    }
}

