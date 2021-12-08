const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'doante',
    category: 'Chức_năng',
    aliases: ['dnt', 'ungho'],
    utilisation: '{prefix}avatar',
    run (client, message, args) {
            const avatarEmbed = new MessageEmbed()
                .setAuthor('Donate cho server Bao Chan', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
                .setColor ('GREEN')
                .setDescription(`Mình chỉ nhận qua duy nhất 1 stk: **167680224 VPBANK Tran Bao Khanh Momo: 0981306049**. Khi gửi các bạn vui lòng cap toàn màn hình biên lai cho mình nhé và gửi tại <#907824785852080178>. Cảm ơn mọi người đã ủng hộ server.`)
                .setTimestamp()
                .setFooter(`Bot: Bao-Chan Bot by PinkDuwc._`, message.author.avatarURL({ dynamic: true }))
            message.channel.send({ embeds: [avatarEmbed] });
    }
}