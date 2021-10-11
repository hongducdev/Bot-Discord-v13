const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'color',
    category: 'fun',
    run: async (client, message, args) => {
        let msg = await message.channel.send('Vui lòng chờ...');
        
        let body = await fetch (`https://api.popcat.xyz/color/${encodeURIComponent(args.join(' '))}`)
        const data = await body.json()
        if (!data) return message.channel.send('Lỗi vui lòng thử lại sau');
            let colorEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`Color name: ${data.name}`)
                .setDescription(`**Hex: **${data.hex}\n**RGB: **${data.rgb}\n**Brightened(Màu sáng hơn): **${data.brightened}`)
                .setImage(data.color_image)
                .setTimestamp()
                .setFooter(`Bot: Duwc510_ by hongduccodedao`, client.user.displayAvatarURL)

        msg.edit({ content:'\u200b',embeds: [colorEmbed] });
    }
}