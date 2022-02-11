const { Client, Intents, MessageEmbed, Collection } = require('discord.js');

module.exports = {
    name: 'say',
    category: '🔮-Chức năng',
    aliases: ['say'],
    utilisation: '{prefix}say',
    usage: '%say [text]',
    descriptions: 'Dùng bot nói dưới dạng ẩn danh',
    run (client, message, args) {
        if (message.deletable) message.delete()
            message.channel.send(args.join(' '));
    }
}