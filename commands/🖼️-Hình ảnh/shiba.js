const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'shiba',
    category: '🖼️-Hình ảnh',
    aliases: [],
    utilisation: '{prefix}shiba',
    usage: '%shiba',
    descriptions: 'Hiển thị hình ảnh về shiba',
    run: async (client, message, args) => {
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đợi mình tí mình đang tìm...', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        let searching = await message.channel.send({embeds: [searchEmbed]})
        const [url] = await fetch("https://shibe.online/api/shibes")
        .then((res) => res.json());

        //nếu có thì trả về ảnh
        const imageEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`[Tải xuống tải đây](${url})`)
        .setImage(url)
        .setAuthor('Hình ảnh: Shiba', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setTimestamp()
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        
        return searching.edit({embeds: [imageEmbed]})
    }
}