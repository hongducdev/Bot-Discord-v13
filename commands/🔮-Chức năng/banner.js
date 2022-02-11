const { MessageEmbed } = require('discord.js');
const axios = require('axios');


module.exports = {
    name: 'banner',
    category: '🔮-Chức năng',
    aliases: [' '],
    utilisation: '{prefix}banner',
    usage: '%avatar [tag/id người khác]',
    descriptions: 'Hiển thị ra banner người khác',

    async run(client, message, args) {
        const user = message.mentions.users.first() || 
        message.guild.members.cache.get(args[0]) || message.author

        axios.get(`https://discordapp.com/api/users/${user.id}`, {
            headers: {
                Authorization: `Bot ${client.config.token}`,
            }
          }).then((res) => {
            console.log(res.data)
            if(!res.data.banner) {
                console.log(`${res.data.username} has no banner`)
                message.reply({embeds: [
                    new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`${res.data.username} không có bannner`)
                ]})
            } else {
                let banner = res.data.banner;
                let url = banner.startsWith('a_') ? '.gif?size=4096' : '.png?size=4096';
                url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${url}`;

                let avatar = res.data.avatar
                // let url2 = avatar.startsWith('a_') ? '.gif?size=512' : '.png?size=512';
                let url2 = `https://cdn.discordapp.com/guilds/${message.guild.id}/users/${user.id}/avatars/${user.avatar}.png?size=512`;

                message.reply({embeds: [
                    new MessageEmbed()
                    .setColor(user.displayHexColor)
                    .setTitle(`Banner của ${user.displayName}`)
                    .setThumbnail(url2)
                    .setDescription(`[Tải xuống tại đây](${url})`)
                    .setImage(url)
                ]})
            }
          })
    }
}