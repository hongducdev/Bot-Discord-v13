const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
const { api_key } = require('../../config.json')
module.exports = {
    name: 'car',
    category: '🖼️-Hình ảnh',
    aliases: ['xe'],
    utilisation: '{prefix}xe',
    usage: '%car',
    descriptions: 'Hiển thị hình ảnh về xe',
    run: async (client, message, args) => {
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đợi mình tí mình đang tìm...', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        let searching = await message.channel.send({embeds: [searchEmbed]})

        const rd = Math.floor(Math.random() * 6137)
        const url = encodeURI(`https://api.tumblr.com/v2/blog/wrooom.tumblr.com/posts/photo?api_key=${api_key}&limit=1&offset=${rd}`)
        await fetch(url)
        .then (res => res.json())
        .then(json => {
            //không trả về thì gửi về embed lỗi
            const noData = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh!`)
            if(!json.response) return searching.edit({embeds : [noData]})

            //nếu có thì trả về ảnh
            const imageEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`${json.response.posts[0].summary}`)
            .setImage(`${json.response.posts[0].photos[0].original_size.url}`)
            .setAuthor('Hình ảnh: Góc setup đẹp', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setTimestamp()
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            
            return searching.edit({embeds: [imageEmbed]})
        })
    }
}
