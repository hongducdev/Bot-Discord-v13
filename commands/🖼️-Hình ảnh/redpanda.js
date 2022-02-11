const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'redpanda',
    category: '🖼️-Hình ảnh',
    aliases: ['gautrucdo', 'redpan'],
    utilisation: '{prefix}redpanda',
    usage: '%redpanda',
    descriptions: 'Hiển thị hình ảnh về gấu trúc đỏ',
    run: async (client, message, args) => {
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đợi mình tí mình đang tìm...', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        let searching = await message.channel.send({embeds: [searchEmbed]})
        const url = await fetch(`https://some-random-api.ml/animal/red_panda`)
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
            .setURL(data.url)
            .setDescription(`**Tiêu đề:** ${data.fact}\n [Tải xuống ở đây](${data.image})`)
            .setImage(data.image)
            .setAuthor('Hình ảnh: Gấu Trúc Đỏ', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setTimestamp()
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            
            return searching.edit({embeds: [imageEmbed]})
        })
    }
}