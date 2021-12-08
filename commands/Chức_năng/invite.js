const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'invite',
    ccategory: 'Chức_năng',
    aliases: ['add'],
    utilisation: '{prefix}invite',
    run (client, message, args) {
        const embed = new MessageEmbed()
        .setAuthor('Bao-Chan Bot',client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setColor('GREEN')
        .setFooter(`Bot: Bao-Chan Bot by PinkDuwc._`, message.author.avatarURL({ dynamic: true }))
        .setDescription(`[Thêm Bao-Chan Bot vào sever](https://discord.com/api/oauth2/authorize?client_id=908546624941355068&permissions=0&scope=bot)`)
        .setTimestamp()
        message.channel.send({ embeds: [embed] });
    }
}