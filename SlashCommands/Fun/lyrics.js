const { MessageEmbed, CommandInteraction } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'lyrics',
    description: 'Hiển thị lời bài hát cần tìm kiếm',
    options: [
        {
            name: 'tên_bài_hát',
            description: 'Tên bài hát',
            required: true,
            type: 'STRING'
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
     run: async(client, interaction, args) => {
        const name = interaction.options.getString('tên_bài_hát');
        const res = await axios.get(`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(name)}`);
        if (!res.data.lyrics) {
            return interaction.reply({embeds: [
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

        return interaction.followUp({ embeds: [embed] });
     }
}