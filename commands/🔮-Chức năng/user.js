const { MessageEmbed} = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'user-test',
    description: 'Tìm kiếm người dùng',
    category: '🔮-Chức năng',
    aliases: ['user-search', 'user-find', 'user-search-find'],
    usage: '<prefix>user-test <tên người dùng>',
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || 
        message.guild.members.cache.get(args[0]) || message.author
        console.log(typeof(args[0]))

        axios.get(`https://discord.com/api/v9/users/${user.id}/profile`,{
            headers: {
                Authorization: `${client.config.token_user}`
            }
        }).then((res) => {
            console.log(res.data)
            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Thông tin của ${res.data.user.username}`)
            .setDescription(`Bio: ${res.data.user.bio}`)

            message.channel.send({ embeds: [embed]})
        })
    }
}