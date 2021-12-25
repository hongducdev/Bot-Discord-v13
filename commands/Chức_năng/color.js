const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'color',
    category: 'Chức_năng',
    aliases: ['co'],
    utilisation: '{prefix}color',
    usage: '%color [mã màu]',
    descriptions: 'Hiển thị ra thông tin theo mã màu',
    run: async (client, message, args) => {
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đang tìm kiếm, vui lòng đợi...', 'https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
        let searching = await message.channel.send({embeds: [searchEmbed]})
        const url = await fetch(`https://api.popcat.xyz/color/${encodeURIComponent(args.join(' '))}`)
        const data = await url.json()
        .then(data=> {
            //không trả về thì gửi về embed lỗi
            const noData = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình thực hiện!`)
            if(!data) return searching.edit({embeds : [noData]})

            //nếu có thì trả về ảnh
            const colorEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor('Information: Color','https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
            .setTitle(`Color name: ${data.name}`)
            .setDescription(`**Hex: **${data.hex}\n**RGB: **${data.rgb}\n**Brightened(Màu sáng hơn): **${data.brightened}`)
            .setImage(data.color_image)
            .setTimestamp()
            .setFooter(`Bot: Bao-Chan Bot by PinkDuwc._`, client.user.displayAvatarURL)
            
            return searching.edit({embeds: [colorEmbed]})
        })
    }
}

