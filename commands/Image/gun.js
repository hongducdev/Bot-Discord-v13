const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'gun',
    category: 'Image',
    run: async (client, message, args) => {
        let msg = await message.channel.send('Vui lòng chờ...');
        
        // let body = await fetch (`https://api.popcat.xyz/gun?image=${encodeURIComponent(args.join(' '))}`)
        const data = await body.json()
        if (!data) return message.channel.send('Lỗi vui lòng thử lại sau');
            let gunEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`Gun`, message.guild.iconURL)
                .setTitle('Download here')
                .setImage(`https://api.popcat.xyz/gun?image=${encodeURIComponent(args.join(' '))}`)
                .setFooter(`Bot: Duwc510_ by hongduccodedao`, client.user.displayAvatarURL)

        msg.edit({ content:'\u200b',embeds: [gunEmbed] });
    }
}