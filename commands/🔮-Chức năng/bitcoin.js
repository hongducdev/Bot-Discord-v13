const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'bitcoin',
    category: '🔮-Chức năng',
    aliases: ['btc'],
    utilisation: '{prefix}bitcoin',
    usage: '%bitcoin',
    descriptions: 'Hiển thị giá bitcoin',
    async run (client, message, args) {
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đang tìm kiếm, vui lòng đợi...', 'https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
        let searching = await message.channel.send({embeds: [searchEmbed]})
        const url = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR,VND`)
        const data = await url.json()
        .then(data=> {
            //không trả về thì gửi về embed lỗi
            const noData = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh!`)
            if(!data) return searching.edit({embeds : [noData]})

            //nếu có thì trả về ảnh
            if (!args[0]) {
                const imageEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor('Bitcoin','https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
                .addField(`**USD**`,`\`${data.USD}\``, true)
                .addField(`**EUR**`,`\`${data.EUR}\``, true)
                .addField(`**VND**`,`\`${data.VND}\``, true)
                .setTimestamp()
                .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
                
                return searching.edit({embeds: [imageEmbed]})
            } else {
                const imageEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor('Bitcoin','https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
                .addField(`**Số BTC**`,`\`${args[0]}\``, true)
                .addField(`**USD**`,`\`${data.USD * args[0]}\``, true)
                .addField(`**EUR**`,`\`${data.EUR * args[0]}\``, true)
                .addField(`**VND**`,`\`${data.VND * args[0]}\``, true)
                .setTimestamp()
                .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
                
                return searching.edit({embeds: [imageEmbed]})
            }
        })
    }
}