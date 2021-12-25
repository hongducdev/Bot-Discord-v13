const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'Chức_năng',
    aliases: ['p'],
    utilisation: '{prefix}ping',
    descriptions: 'Kiểm tra độ trễ của bot',
    run: async (client, message, args) => {
        let pingingembed = new MessageEmbed();
        pingingembed.setAuthor('Bao-Chan Bot', client.user.displayAvatarURL({ size: 1024, dynamic: true }));
        pingingembed.setColor('GREEN');
        pingingembed.setDescription(`🏓Pinging ...`);
        let pinging = await message.channel.send({embeds: [pingingembed]});

        const pingEmbed = new MessageEmbed()
            .setAuthor('Bao-Chan Bot', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setColor ('GREEN')
            .setDescription(`🏓 Pong...`)
            .addField(`**Độ trễ(Bot)**`,`\`${Math.floor(pinging.createdTimestamp - message.createdTimestamp)}ms\``,true)
            .addField(`**Độ trễ(API)**`,`\`${client.ws.ping}ms\``,true)
            .setTimestamp()
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))

        pinging.edit({embeds: [pingEmbed]})
    }
}