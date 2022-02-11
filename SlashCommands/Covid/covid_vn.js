const { Client, CommandInteraction, MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');
const capitalize = require('capitalize')

module.exports = {
    name: 'covid_vn',
    description: 'Hiển thị thông tin Covid-19 theo tên thành phố ở Việt Nam',
    options: [
        {
            name: 'name_countries',
            description: 'Nhập tên thành phố tại Việt Nam (có dấu và không viết tắt)',
            type: 'STRING',
            required: true
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const Format = Intl.NumberFormat();
        const name_countries = interaction.options.getString('name_countries');

        let query = name_countries;
        if (query == 'hcm' || query == 'tphcm' || query == 'tphcm' || query == 'Hồ Chí Minh' || query == 'Sài Gòn' || query == 'hồ chí minh' || query == 'sài gòn' || query == 'TP Hồ Chí Minh') query = 'Hồ Chí Minh';

        const url = await fetch(`https://api.ncovvn.xyz/cityvn`)
        const data = await url.json()
        .then(data=> {
            data = data.filter(el => el.dia_diem == query);
            data = data[0];

            console.log(data)
            let d = new Date(data.updatedAt);
            let fulldate = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(`https://cdn.discordapp.com/attachments/239446877953720321/691020838379716698/unknown.png`)
            .setTitle(`Thông tin Covid-19 tại ${data.dia_diem}`)
            .addField(`**Tử vong**`,`${Format.format(data.tu_vong)}`, true)
            .addField(`**Hôm nay**`,`${Format.format(data.hom_nay)}`, true)
            .addField(`**Tổng ca nhiễm**`,`${Format.format(data.tong_ca_nhiem)}`, true)
            .addField('**Ngày cập nhật**',`${fulldate}`, true)
            .addField(`**Cập nhật thêm thông tin**`, `[Cổng thông tin của Bộ Y tế Việt Nam](https://covid19.gov.vn/)`, true)
            .setFooter(` Dữ liệu từ: covid19.gov.vn`)
            .setTimestamp()

            return interaction.followUp({embeds: [embed]})
        });
    }
}
