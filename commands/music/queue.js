const  { checkSameRoom } = require('../../utils');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'queue',
    category: 'music',
    aliases: ['q'],
    description: 'Chơi nhạc từ youtube, spotify, soundcloud',
    run: async(client, message, args) => {
        if (checkSameRoom(message)) return;
        const query = args.join(' ');
        const queue = client.player.createQueue(message.guild, {
            metadata: message,
        });
        const result = await client.player.search(query, {
          requestedBy: message.author
        })
        
        if (!queue || !queue.playing) return void message.reply({ content: '❌ | No music is being played!' });
        if (!queue.options.page) queue.options.page = 1;
        const pageStart = 10 * (queue.options.page - 1);
        const pageEnd = pageStart + 10;
        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
            return `${i + pageStart + 1}. **${m.title}** ([link](${m.url}))`;
        });

        return void message.reply({
            embeds: [
                {
                    title: 'Danh sách phát',
                    description: `${tracks.join('\n')}${
                        queue.tracks.length > pageEnd
                            ? `\n...${queue.tracks.length - pageEnd} more track(s)`
                            : ''
                    }`,
                    color: 'GREEN',
                    fields: [{ name: 'Đang phát...', value: `🎶 |[**${currentTrack.title}**](${currentTrack.url})` }]
                }
            ]
        });
    }
}