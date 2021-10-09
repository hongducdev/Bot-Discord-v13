const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'cry',
    category: 'Action',
    run: async (client, message, args) => {
        let msg = await message.channel.send('Vui lòng chờ...');
        
        let body = await fetch (`http://api.nekos.fun:8080/api/cry`)
        const data = await body.json()
        if (!data) return message.channel.send('Lỗi vui lòng thử lại sau');
            let cryEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`Cry`, message.guild.iconURL)
                .setImage(data.image)
                .setTimestamp()
                .setFooter(`Bot: Duwc510_ by hongduccodedao`, client.user.displayAvatarURL)

        msg.edit({ content:'\u200b',embeds: [cryEmbed] });
    }
}