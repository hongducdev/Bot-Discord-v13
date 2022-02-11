const { MessageEmbed, CommandInteraction } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'covid_all',
    description: 'Hiện thị thông tin Covid-19 trên toàn cầu',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
     run: async (client, interaction, args) => {
        const Format = Intl.NumberFormat();
        const url = await fetch(`https://api.ncovvn.xyz/wom`)
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
            .setAuthor('Thông tin Covid Thế giới', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setThumbnail(`https://cdn.discordapp.com/attachments/239446877953720321/691020838379716698/unknown.png`)
            .addField(`**Số ca nhiễm:**`, `${Format.format(data.cases)} \n(+${Format.format(data.todayCases)})`, true)
            .addField(`**Số ca tử vong:**`, `${Format.format(data.deaths)} \n(+${Format.format(data.todayDeaths)})`, true)
            .addField(`**Số ca hồi phục:**`, `${Format.format(data.recovered)} \n(+${Format.format(data.todayRecovered)})`, true)
            .addField(`**Số ca nghiêm trọng:**`, `${Format.format(data.critical)}`, true)
            .addField(`**Số quốc gia bị nhiễm:**`, `${Format.format(data.affectedCountries)}`, true)
            .addField('Ngày cập nhật: ',`${fulldate}`, true)

            return interaction.followUp({embeds: [imageEmbed]})
        })
    }
}
