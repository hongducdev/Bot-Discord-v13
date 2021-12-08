const { Client, Intents, MessageEmbed, Collection } = require('discord.js');

module.exports = {
    name: 'say',
    category: 'Chức_năng',
    aliases: ['say'],
    utilisation: '{prefix}say',
    run (client, message, args) {
        if (message.deletable) message.delete()
            message.channel.send(args.join(' '));
    }
}