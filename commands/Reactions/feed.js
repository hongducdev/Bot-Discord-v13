const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'feed',
    category: 'Reactions',
    aliases: ['cho_an','choan'],
    usage: '%feed [tag/id người dùng]',
    descriptions: 'Feed!',
    run: async (client, message, args) => {
        const member = message.mentions.members.first()|| message.guild.members.cache.get(args[0]) || message.member
        if(member.id === message.author.id) return message.reply ("Baka! Bạn không thể làm thế với chính mình!");
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đợi mình tí mình đang tìm...', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        let searching = await message.channel.send({embeds: [searchEmbed]})

        const url = await fetch(`https://nekos.life/api/v2/img/feed`)
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
            .setAuthor('Reaction: Feed',client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setDescription(`${message.member.displayName} đã cho ${member.displayName} ăn!`)
            .setImage(data.url)
            .setTimestamp()
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            
            return searching.edit({embeds: [imageEmbed]})
        })
    }
}
