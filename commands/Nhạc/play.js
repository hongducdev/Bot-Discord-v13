const { QueryType } = require('discord-player');

module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'Nhạc',
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true,

    async run(client, message, args) {
        if (!args[0]) return message.channel.send(`Vui lòng nhập ${message.author}... thử lại ? ❌`);

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`Không tìm thấy kết quả ${message.author}... thử lại ? ❌`);

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return message.channel.send(`Bao-Chan Bot không vào được kênh thoại ${message.author}... thử lại? ❌`);
        }

        await message.reply(`Đợi tớ tí tớ đang tìm kiếm ${res.playlist ? 'danh sách nhạc này' : 'bài hát này'}... 🔎`);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};