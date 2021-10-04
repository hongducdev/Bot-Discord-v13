const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'cat',
    category: 'Image',
    run: async (client, message, args) => {
        let msg = await message.channel.send('Vui lòng chờ...');
        
        let body = await fetch (`http://aws.random.cat/meow`)
        const data = await body.json()
        if (!data) return message.channel.send('Lỗi vui lòng thử lại sau');
            let cEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`Cat`, message.guild.iconURL)
                .setURL(data.file)
                .setTitle('Download here')
                .setImage(data.file)
                .setTimestamp()
                .setFooter(`Bot: Duwc510_ by hongduccodedao`, client.user.displayAvatarURL)

        msg.edit({ content:'\u200b',embeds: [cEmbed] });
    }
}