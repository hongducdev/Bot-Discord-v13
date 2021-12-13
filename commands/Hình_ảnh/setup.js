const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
const { api_key } = require('../../config.json')
module.exports = {
    name: 'setup',
    category: 'Hình_ảnh',
    aliases: ['setup'],
    utilisation: '{prefix}setup',
    run: async (client, message, args) => {
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đang tìm kiếm, vui lòng đợi...', 'https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
        let searching = await message.channel.send({embeds: [searchEmbed]})

        const rd = Math.floor(Math.random() * 500)
        const url = encodeURI(`https://api.tumblr.com/v2/blog/designersworkspace.tumblr.com/posts/photo?api_key=${api_key}&limit=1&offset=${rd}`)
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
            .setAuthor('Image: Setup','https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
            .setDescription(`${json.response.posts[0].summary}`)
            .setImage(`${json.response.posts[0].photos[0].original_size.url}`)
            .setTimestamp()
            .setFooter(`Bot: Bao-Chan Bot by PinkDuwc._`, client.user.displayAvatarURL)
            
            return searching.edit({embeds: [imageEmbed]})
        })
    }
}
