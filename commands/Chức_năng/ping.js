const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'Chức_năng',
    aliases: ['ping'],
    utilisation: '{prefix}ping',
    run (client, message, args) {
        const pingEmbed = new MessageEmbed()
            .setTitle("🏓  **Pong**:")
            .setColor ('GREEN')
            .setDescription(`Ping: ${client.ws.ping} ms`)
            .setTimestamp()
        message.channel.send({ embeds: [pingEmbed] });
    }
}