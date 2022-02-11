const { MessageEmbed, CommandInteraction } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'covid_countries',
    description: 'Hiện thị thông tin Covid-19 theo tên thành phố',
    options: [
        {
            name: 'name_countries',
            description: 'Nhập tên thành phố muốn hiển thị thông tin',
            type: 'STRING',
            require: true
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
        const url = await fetch(`https://api.ncovvn.xyz/wom/countries/${name_countries}`)
        const data = await url.json()
        .then(data=> {
            //không trả về thì gửi về embed lỗi
            const noData = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh!`)
            if(!data) return interaction.followUp({embeds : [noData]})

            let d = new Date(data.updated);
            let fulldate = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
            //nếu có thì trả về ảnh

            const imageEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(` Thông tin Covid của ${data.country}`)
            .setThumbnail(data.countryInfo.flag)
            .addField(`**Số ca nhiễm:**`, `${Format.format(data.cases)} \n(+${Format.format(data.todayCases)})`, true)
            .addField(`**Số ca tử vong:**`, `${Format.format(data.deaths)} \n(+${Format.format(data.todayDeaths)})`, true)
            .addField(`**Số ca hồi phục:**`, `${Format.format(data.recovered)} \n(+${Format.format(data.todayRecovered)})`, true)
            .addField(`**Số ca nghiêm trọng:**`, `${Format.format(data.critical)}`, true)
            .addField('Ngày cập nhật: ',`${fulldate}`, true)
            .setTimestamp()

            return interaction.followUp({embeds: [imageEmbed]})
        })
    }
}
