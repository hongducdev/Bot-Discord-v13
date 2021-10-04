const { MessageEmbed, Util } = require('discord.js');
const { parse } = require('twemoji-parser');

module.exports = {
    name: 'emoji',
    category: 'user',
    run (client, message, args) {
        const emoji = args[0];
        if (!emoji) return message.channel.send("Nhập emoji đi bạn!");

        let custom = Util.parseEmoji(emoji);
        const embed = new MessageEmbed()
            .setTitle(`Phóng to emoji: ${emoji}`)
            .setColor('GREEN')

        if (custom.id) {
            let link = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animation ? "gif" : "png"}`;
            embed.setImage(link)
                .setFooter (`Emoji ID: ${custom.id}`);
            return message.channel.send ({ embeds: [embed] });
        } else {
            let parsed = parse(emoji, {assetType: 'png'});
            if (!parsed[0]) return message.channel.send('Emoji không hợp lệ!');
            embed.setImage(parsed[0].url);
            return message.channel.send({ embeds: [embed] });
        }
    }
}