const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
const capitalize = require('capitalize');

module.exports = {
    name: 'covid_vn',
    category: '🔮-Chức năng',
    aliases: ['covidvn'],
    utilisation: '{prefix}covid',
    usage: '%covid_vn [Tên thành phố tại Việt Nam(có dấu và không viết tắt)]',
    descriptions: 'Hiển thị thông tin Covid theo thành phố tại Việt Nam',
    run: async (client, message, args) => {
        const Format = Intl.NumberFormat();
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đang tìm kiếm, đợi mình dữ liệu từ covid19.gov.vn nha...', 'https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
        let searching = await message.channel.send({embeds: [searchEmbed]})

        if (!args[0]) return message.reply('Bạn phải nhập tên tỉnh (có dấu) để tìm kiếm!');
        let query = args.join(' ')
        if (query == 'hcm' || query == 'tphcm' || query == 'tphcm' || query == 'Hồ Chí Minh' || query == 'Sài Gòn' || query == 'hồ chí minh' || query == 'sài gòn') query = 'Hồ Chí Minh';
        const url = await fetch(`https://api.ncovvn.xyz/cityvn`)
        const data = await url.json()
        .then(data=> {
            const noData = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình tìm thông tin!`)
            if(!data) return searching.edit({embeds : [noData]})

            data = data.filter(el => el.dia_diem == query);
            data = data[0];
            console.log(data)
            let d = new Date(data.updatedAt);
            let fulldate = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(`https://cdn.discordapp.com/attachments/239446877953720321/691020838379716698/unknown.png`)
            .setTitle(` Thông tin Covid-19 tại ${data.dia_diem}`)
            .addField(`**Tử vong**`,`${Format.format(data.tu_vong)}`, true)
            .addField(`**Hôm nay**`,`${Format.format(data.hom_nay)}`, true)
            .addField(`**Tổng ca nhiễm**`,`${Format.format(data.tong_ca_nhiem)}`, true)
            .addField('**Ngày cập nhật**',`${fulldate}`, true)
            .addField(`**Cập nhật thêm thông tin**`, `[Cổng thông tin của Bộ Y tế Việt Nam](https://covid19.gov.vn/)`, true)
            .setFooter(` Dữ liệu từ: covid19.gov.vn`)
            .setTimestamp()

            return searching.edit({embeds: [embed]})
    })
}
}
