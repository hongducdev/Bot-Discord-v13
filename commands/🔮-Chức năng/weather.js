const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'weather',
    category: '🔮-Chức năng',
    aliases: ['we', 'thoitiet'],
    utilisation: '{prefix}weather',
    usage: '%weather [tên thành phố]',
    descriptions: 'Hiển thị thông tin thời tiết theo thành phố',
    run: async (client, message, args) => {
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đang tìm kiếm, vui lòng đợi...', 'https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
        let searching = await message.channel.send({embeds: [searchEmbed]})
        const url = await fetch(`https://api.popcat.xyz/weather?q=${encodeURIComponent(args.join(' '))}`)
        const data = await url.json()
        .then(data=> {
            //không trả về thì gửi về embed lỗi
            const noData = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình thực hiện!`)
            if(!data) return searching.edit({embeds : [noData]})

            //nếu có thì trả về ảnh
            const wetherEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor('---- Dự báo thời tiết ☁️ ----','https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
            .setThumbnail(data[0].current.imageUrl)
            .setTitle(`Địa điểm: ${data[0].location.name}`)
            .setDescription(`**Múi giờ: **${data[0].location.timezone}\n**Thời gian cập nhật:** ${data[0].current.date} - ${data[0].current.observationtime}\n**Nhiệt độ cảm thấy:** ${data[0].current.feelslike}°C\n**Độ ẩm:** ${data[0].current.humidity}\n**Gió:** ${data[0].current.winddisplay}\n
            **--- Hôm qua ---**\n**Ngày: **${data[0].forecast[0].date} - ${data[0].forecast[0].shortday}\n**Nhiệt độ:** ${data[0].forecast[0].low} - ${data[0].forecast[0].high}°C\n**Trời: ** ${data[0].forecast[0].skytextday}\n**Giáng thủy: ** ${data[0].forecast[0].precip}\n
            **--- Hôm nay ---**\n**Ngày: **${data[0].forecast[1].date} - ${data[0].forecast[1].shortday}\n**Nhiệt độ:** ${data[0].forecast[1].low} - ${data[0].forecast[1].high}°C\n**Trời: ** ${data[0].forecast[1].skytextday}\n**Giáng thủy: ** ${data[0].forecast[1].precip}\n
            **--- Ngày mai ---**\n**Ngày: **${data[0].forecast[2].date} - ${data[0].forecast[2].shortday}\n**Nhiệt độ:** ${data[0].forecast[2].low} - ${data[0].forecast[2].high}°C\n**Trời: ** ${data[0].forecast[2].skytextday}\n**Giáng thủy: ** ${data[0].forecast[2].precip}\n`)
            .setFooter(`Bot: Bao-Chan Bot by PinkDuwc._`, client.user.displayAvatarURL)
        
            return searching.edit({embeds: [wetherEmbed]})
        })
    }
}

