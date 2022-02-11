const { CommandInteraction, Client, MessageEmbed } = require('discord.js')
const yesno = {
    true: "Đúng",
    false: "Không"
};
const moment = require('moment');

module.exports = {
    name: 'emojiinfo',
    description: 'Hiển thị thông tin của emoji',
    options: [
        {
            name: 'emoji',
            description: 'Nhập emoji',
            type: 'STRING',
            required: true,
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @param {String[]} args
     */

    run: async(client, interaction, args) => {
        const Emoji = interaction.options.getString('emoji').replace(/^<a?:\w+:(\d+)>$/, "$1");
        const emoji = interaction.guild.emojis.cache.find((emoji) => emoji.name === Emoji || emoji.id === Emoji);

        if(!emoji) {
            return interaction.followUp({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription(`Emoji này không thuộc trong server!`)
            ]})
        }

        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`Thông tin Emoji trong Server`)
        .addField(`Tên`, `${emoji.name}`, true)
        .addField(`ID Emoji`, `${emoji.id}`, true)
        .addField(`Emoji động`, `${yesno[emoji.animated]}`, true)
        .addField(`Được thêm bởi`, `${(await emoji.fetchAuthor()).tag}`, true)
        .addField(`Thời gian thêm`, `${moment(emoji.createdTimestamp).format('DD/MM/YYYY')}`, true)
        .addField(`Emoji URL`, `[Link Emoji](${emoji.url})`, true)
        .setThumbnail(emoji.url)

        return interaction.followUp({embeds: [embed]})
    }
}
