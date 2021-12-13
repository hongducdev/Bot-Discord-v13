const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'shiba',
    category: 'Hình_ảnh',
    aliases: ['shiba'],
    utilisation: '{prefix}shiba',
    run: async (client, message, args) => {
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đang tìm kiếm, vui lòng đợi...', 'https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
        let searching = await message.channel.send({embeds: [searchEmbed]})
        const [url] = await fetch("https://shibe.online/api/shibes")
        .then((res) => res.json());

        //nếu có thì trả về ảnh
        const imageEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Hình ảnh: Shiba','https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
        .setDescription(`[Tải xuống tải đây](${url})`)
        .setImage(url)
        .setTimestamp()
        .setFooter(`Bot: Bao-Chan Bot by PinkDuwc._`, client.user.displayAvatarURL)
        
        return searching.edit({embeds: [imageEmbed]})
    }
}