const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'car',
    category: 'Image',
    run: async (client, message, args) => {
        let msg = await message.channel.send('Vui lòng chờ...');
        
        let body = await fetch (`https://api.popcat.xyz/car`)
        const data = await body.json()
        if (!data) return message.channel.send('Lỗi vui lòng thử lại sau');
            let carEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`Car`, message.guild.iconURL)
                .setDescription(data.title)
                .setURL(data.image)
                .setTitle('Download here')
                .setImage(data.image)
                .setTimestamp()
                .setFooter(`Bot: Duwc510_ by hongduccodedao`, client.user.displayAvatarURL)

        msg.edit({ content:'\u200b',embeds: [carEmbed] });
    }
}