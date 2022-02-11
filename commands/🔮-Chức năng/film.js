const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'film',
    category: '🔮-Chức năng',
    descriptions: 'Thông tin về một bộ phim',
    aliases: ['phim'],
    utilisation: '{prefix}covid',
    usage: '%film <Tên bộ phim>', 

    async run (client, message, args) {
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đang tìm kiếm, vui lòng đợi...', 'https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
        let searching = await message.channel.send({embeds: [searchEmbed]})
        const url = await fetch(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(args.join(' '))}`)
        const data = await url.json()

        const res = await fetch(`https://api.popcat.xyz/translate?to=vi&text=${data.plot}`)
        const data1 = await res.json()
        // .then(data=> {
            //không trả về thì gửi về embed lỗi
            const noData = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình tìm!`)
            if(!data) return searching.edit({embeds : [noData]})

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

            return searching.edit({embeds: [embed]})
    }
}