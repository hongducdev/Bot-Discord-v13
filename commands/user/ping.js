const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'user',
    run (client, message, args) {
        const pingEmbed = new MessageEmbed()
            .setTitle("🏓  **Pong**:")
            .setColor ('GREEN')
            .setDescription(`Ping: ${client.ws.ping} ms`)
        message.channel.send({ embeds: [pingEmbed] });
    }
}