const { MessageEmbed, CommandInteraction } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'film',
    description: 'Hiển thị thông tin phim theo tên phim!',
    options: [
        {
            name: 'name',
            description: 'Nhập tên phim!',
            type: 'STRING',
            required: true,
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
     run: async (client, interaction, args) => {
        const name_film = interaction.options.getString('name');
        const url = await fetch(`https://api.popcat.xyz/imdb?q=${name_film}`)
        const data = await url.json()

        const res = await fetch(`https://api.popcat.xyz/translate?to=vi&text=${data.plot}`)
        const data1 = await res.json()

            //nếu có thì trả về ảnh
            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(` Thông tin về bộ phim **${data.title}**`)
            .addField(`**Tên phim**`, `\`${data.name}\``, true)
            .addField(`**Thể loại**`, `\`${data.genres}\``, true)
            .addField(`**Độ dài**`, `\`${data.runtime}\``, true)
            .addField(`**Năm phát hành**`, `\`${data.year}\``, true)
            .addField(`**Giám đốc**`, `\`${data.director}\``, true)
            .addField(`**Nhà văn**`, `\`${data.writer}\``, true)
            .addField(`**Diễn viên**`, `\`${data.actors}\``, true)
            .addField(`**Đánh giá**`, `\`${data.rating}\``, true)
            .addField(`**Doanh thu**`, `\`${data.boxoffice}\``, true)
            .addField(`**Series**`, `\`${data.series ? "Có✅" : "Không⛔"}\``, true)
            .addField(`**Thêm thông tin**`, `[Link](${data.imdburl})`,  true)
            .addField(`**Giới thiệu**`, `${data1.translated}`)
            .setImage(data.poster)

            return interaction.followUp({embeds: [embed]})
    }
}
