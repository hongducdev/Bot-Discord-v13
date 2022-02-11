const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'lyrics',
    aliases: ['lrc'],
    category: '🔮-Chức năng',
    descriptions: 'Hiển thị lời bài hát cần tìm kiếm',

    run: async (client, message, args) => {
        if (!args[0]) {
            return message.reply({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('Vui lòng nhập tên bài hát')
            ]})
        }
        const res = await axios.get(`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(args.join(' '))}`);
        if (!res.data.lyrics) {
            return message.reply({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('Không tìm thấy lời bài hát')
            ]})
        }
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`Lời bài hát ${res.data.title}`)
        .setDescription(`Tên bài hát: ${res.data.title}.\n
        Tác giả: ${res.data.artist}.\n
        ${res.data.lyrics}`)
        .setThumbnail(res.data.image)
        .setFooter(`Tìm thấy bài hát ${res.data.title}`);

        return message.reply({ embeds: [embed] });
    }
}
