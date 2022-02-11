const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'covid',
    category: '🔮-Chức năng',
    aliases: ['covid'],
    utilisation: '{prefix}covid',
    usage: '%covid [all|global|globe|world: Thế giới || Tên thành phố]',
    descriptions: 'Hiển thị thông tin Covid của thế giới hoặc theo thành phố trên thế giới',
    run: async (client, message, args) => {
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đang tìm kiếm, đợi mình dữ liệu từ worldometers.info nha...', 'https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
        let searching = await message.channel.send({embeds: [searchEmbed]})
        
        const Format = Intl.NumberFormat();
        if (!args[0] || args[0].match(/all|global|globe|world/gi)) {
            const url = await fetch(`https://api.ncovvn.xyz/wom`)
            const data = await url.json()
            .then(data=> {
            //không trả về thì gửi về embed lỗi
            const noData = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh!`)
            if(!data) return searching.edit({embeds : [noData]})

            let d = new Date(data.updated);
            let fulldate = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
            //nếu có thì trả về ảnh
            

            const imageEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor('Thông tin Covid Thế giới', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .addField(`**Số ca nhiễm:**`, `${Format.format(data.cases)} \n(+${Format.format(data.todayCases)})`, true)
            .addField(`**Số ca tử vong:**`, `${Format.format(data.deaths)} \n(+${Format.format(data.todayDeaths)})`, true)
            .addField(`**Số ca hồi phục:**`, `${Format.format(data.recovered)} \n(+${Format.format(data.todayRecovered)})`, true)
            .addField(`**Số ca nghiêm trọng:**`, `${Format.format(data.critical)}`, true)
            .addField(`**Số quốc gia bị nhiễm:**`, `${Format.format(data.affectedCountries)}`, true)
            .addField('Ngày cập nhật: ',`${fulldate}`, true)
            .setTimestamp()
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))

            return searching.edit({embeds: [imageEmbed]})
        })
        } else {
            const url = await fetch(`https://corona.lmao.ninja/v2/countries/${args.join(' ')}`)
            const data = await url.json()
            .then(data=> {
            //không trả về thì gửi về embed lỗi
            const noData = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh!`)
            if(!data.country) return searching.edit({embeds : [noData]})

            let d = new Date(data.updated);
            let fulldate = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
            //nếu có thì trả về ảnh

            const imageEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor('Thông tin Covid', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setThumbnail(data.countryInfo.flag)
            .addField(`**Đia điểm:**`,`${data.country}`, true)
            .addField(`**Số ca nhiễm:**`, `${Format.format(data.cases)} \n(+${Format.format(data.todayCases)})`, true)
            .addField(`**Số ca tử vong:**`, `${Format.format(data.deaths)} \n(+${Format.format(data.todayDeaths)})`, true)
            .addField(`**Số ca hồi phục:**`, `${Format.format(data.recovered)} \n(+${Format.format(data.todayRecovered)})`, true)
            .addField(`**Số ca nghiêm trọng:**`, `${Format.format(data.critical)}`, true)
            .addField('Ngày cập nhật: ',`${fulldate}`, true)
            .setTimestamp()
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))

            return searching.edit({embeds: [imageEmbed]});
        })
        }
    }
}
