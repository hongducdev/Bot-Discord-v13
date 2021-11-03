const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'weather',
    category: 'fun',
    run: async (client, message, args) => {
        let msg = await message.channel.send('Vui lòng chờ...');
        
        let body = await fetch (`https://api.popcat.xyz/weather?q=${encodeURIComponent(args.join(' '))}`)
        const data = await body.json()
        if (!data) return message.channel.send('Lỗi vui lòng thử lại sau');
            let wEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`---- Dự báo thời tiết ☁️ ----`)
                .setThumbnail(data[0].current.imageUrl)
                .setTitle(`Địa điểm: ${data[0].location.name}`)
                .setDescription(`**Múi giờ: **${data[0].location.timezone}\n**Thời gian cập nhật:** ${data[0].current.date} - ${data[0].current.observationtime}\n**Nhiệt độ cảm thấy:** ${data[0].current.feelslike}°C\n**Độ ẩm:** ${data[0].current.humidity}\n**Gió:** ${data[0].current.winddisplay}\n
                **--- Hôm qua ---**\n**Ngày: **${data[0].forecast[0].date} - ${data[0].forecast[0].shortday}\n**Nhiệt độ:** ${data[0].forecast[0].low} - ${data[0].forecast[0].high}°C\n**Trời: ** ${data[0].forecast[0].skytextday}\n**Giáng thủy: ** ${data[0].forecast[0].precip}\n
                **--- Hôm nay ---**\n**Ngày: **${data[0].forecast[1].date} - ${data[0].forecast[1].shortday}\n**Nhiệt độ:** ${data[0].forecast[1].low} - ${data[0].forecast[1].high}°C\n**Trời: ** ${data[0].forecast[1].skytextday}\n**Giáng thủy: ** ${data[0].forecast[1].precip}\n
                **--- Ngày mai ---**\n**Ngày: **${data[0].forecast[2].date} - ${data[0].forecast[2].shortday}\n**Nhiệt độ:** ${data[0].forecast[2].low} - ${data[0].forecast[2].high}°C\n**Trời: ** ${data[0].forecast[2].skytextday}\n**Giáng thủy: ** ${data[0].forecast[2].precip}\n`)
                .setFooter(`Bot: Duwc510_ by hongduccodedao`, client.user.displayAvatarURL)

        msg.edit({ content:'\u200b',embeds: [wEmbed] });
    }
}