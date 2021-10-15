const { checkSameRoom } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'skip',
    aliases: ['s', 'next'],
    category: 'music',
    description: 'Bỏ qua bài hát',
    run: async (client, message, args) => {
        if (checkSameRoom (message)) return;
        const query = args.join(' ');
        const queue = client.player.createQueue(message.guild, {
            metadata: message,
        });
        if (!queue || !queue.playing) return void message.reply({ content: '❌ | Không có nhạc để phát!' });
        const currentTrack = queue.current;
        const success = queue.skip();
        const skipEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Đã skip...`)
            .setDescription(success ? `✅ | Đã skip thành công **${currentTrack}**!` : '❌ | Đã xảy ra lỗi!')
            .setTimestamp()
        return void message.channel.send({ embeds : [skipEmbed]});
    }
}