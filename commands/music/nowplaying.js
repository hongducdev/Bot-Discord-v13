const { checkSameRoom } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    category: 'music',
    description: 'Bài hát đang phát hiện tại!',
    run: async (client, message, args) => {
        if (checkSameRoom (message)) return;
        const query = args.join(' ');
        const queue = client.player.createQueue(message.guild, {
            metadata: message,
        });
        if (!queue || !queue.playing) return void message.channel.send({ content: '❌ | Không có nhạc để phát!' });
        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();
        const npEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor('Đang chơi..', 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif')
            .setDescription( `🎶 | [**${queue.current.title}**](${queue.current.url})! (\`${perc.progress == 'Infinity' ? 'Live' : perc.progress + '%'}\`)\n**Người thêm: ** ${queue.current.requestedBy.username}`)
            .setTimestamp()
        return void message.channel.send({ embeds: [npEmbed] });
    }
}
