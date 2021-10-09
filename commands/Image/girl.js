const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'girl',
    category: 'Image',
    run: async (client, message, args) => {
        let msg = await message.channel.send('Vui lòng chờ...');
        
        let body = await fetch (`https://api.huyapi.ga/v2/?type=gai`)
        const data = await body.json()
        if (!data) return message.channel.send('Lỗi vui lòng thử lại sau');
            let boyEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`Boy`, message.guild.iconURL)
                .setImage(data.url)
                .setTimestamp()
                .setFooter(`Bot: Duwc510_ by hongduccodedao`, client.user.displayAvatarURL)

        msg.edit({ content:'\u200b',embeds: [boyEmbed] });
    }
}