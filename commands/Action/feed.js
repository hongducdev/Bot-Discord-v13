const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'feed',
    category: 'Action',
    run: async (client, message, args) => {
        let msg = await message.channel.send('Vui lòng chờ...');
        
        let body = await fetch (`http://api.nekos.fun:8080/api/feed`)
        const data = await body.json()
        if (!data) return message.channel.send('Lỗi vui lòng thử lại sau');
            let feedEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`Feed`, message.guild.iconURL)
                .setImage(data.image)
                .setTimestamp()
                .setFooter(`Bot: Duwc510_ by hongduccodedao`, client.user.displayAvatarURL)

        msg.edit({ content:'\u200b',embeds: [feedEmbed] });
    }
}