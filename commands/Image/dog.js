const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'dog',
    category: 'Image',
    run: async (client, message, args) => {
        let msg = await message.channel.send('Vui lòng chờ...');
        
        let body = await fetch (`https://dog.ceo/api/breeds/image/random`)
        const data = await body.json()
        if (!data) return message.channel.send('Lỗi vui lòng thử lại sau');
            let dEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`Dog`, message.guild.iconURL)
                .setImage(data.message)
                .setTimestamp()
                .setFooter(`Bot: Duwc510_ by hongduccodedao`, client.user.displayAvatarURL)

        msg.edit({ content:'\u200b',embeds: [dEmbed] });
    }
}