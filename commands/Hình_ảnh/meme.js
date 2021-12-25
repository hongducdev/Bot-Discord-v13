const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
const { api_key } = require('../../config.json')
module.exports = {
    name: 'meme',
    category: 'Hình_ảnh',
    aliases: [],
    utilisation: '{prefix}meme',
    usage: '%meme',
    descriptions: 'Hiển thị hình ảnh random về meme từ reddit',
    run: async (client, message, args) => {
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đợi mình tí mình đang tìm...', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        let searching = await message.channel.send({embeds: [searchEmbed]})

        const url = await fetch(`https://api.popcat.xyz/meme`)
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
            .setAuthor('Hình ảnh: Meme','https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
            .setTitle(data.title)
            .setDescription(`Link bài viết gốc: [url](${data.url})`)
            .addField(`Upvotes:`, `\`${data.upvotes}\``, true)
            .addField(`Comments:`, `\`${data.comments}\``, true)
            .setImage(data.image)
            .setTimestamp()
            .setFooter(`Bot: Bao-Chan Bot by PinkDuwc._`, client.user.displayAvatarURL)
            
            return searching.edit({embeds: [imageEmbed]})
        })
    }
}
