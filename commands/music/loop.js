const { checkSameRoom } = require('../../utils')
const { QueueRepeatMode } = require('discord-player');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'loop',
    category: 'music',
    aliases: ['repeat'],
    description: 'Lặp lại danh sách phát',

    async run(client, message, args) {
        if (checkSameRoom(message)) return;
        const queue = client.player.getQueue(message.guild)
        if (!queue || !queue.playing) return void message.reply({
            content: '❌ | No music is being played!'
        });
        if (queue.repeatMode) {
            queue.setRepeatMode(QueueRepeatMode.OFF);
            const disableLoop = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor(`✅- Đã tắt lặp lại!`)
            .setTimestamp()
            return message.channel.send({ embeds: [disableLoop] });
        } else {
            queue.setRepeatMode(QueueRepeatMode.QUEUE);
            const enableLoop = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor(`✅- Đã bật lặp lại!`)
            .setTimestamp()
            return message.channel.send({ embeds: [enableLoop] });
        };
    }
}
