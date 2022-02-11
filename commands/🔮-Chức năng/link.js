const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'link',
    category: '🔮-Chức năng',
    aliases: ['link'],
    utilisation: '{prefix}link',
    usage: '%link',
    descriptions: 'Hiển thị ra các đường dẫn tới các nền tảng của Bao Chẩn',
    run: async (client, message, args) => {
        const linkEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor('Bao-Chan Bot', 'https://cdn.discordapp.com/icons/903297678505566228/8b32d20aa57d7ea388fd005b44b12526.png?size=128')
            .setThumbnail(`https://cdn.discordapp.com/icons/903297678505566228/8b32d20aa57d7ea388fd005b44b12526.png?size=128`)
            .setTitle('**Link server Discord, Youtube, Facebook Bao-Chan:**')
            .setDescription(
                `[**Link tham gia vĩnh viễn của server Bao-Chan**\n](https://dsc.gg/baochanthanhthien)
                [**Linnk kênh Youtube Bao-chan Nè**\n](https://www.youtube.com/channel/UCRhg_BhioP9Nhtk44oc-s2w)
                [**Link Fanpage Bao-Chan nè**\n](https://www.facebook.com/BaoChanGaming)
                [**Link Group Bao-chan (anti B Ray)**\n](https://www.facebook.com/groups/baochanne)
            `)
            message.reply({embeds : [linkEmbed]})
    }
}
