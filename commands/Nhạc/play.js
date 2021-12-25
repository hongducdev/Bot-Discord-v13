const { QueryType } = require('discord-player');

module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'Nhạc',
    utilisation: '{prefix}play [song name/URL]',
    usage: '%play [tên bài hát/URL]',
    descriptions: 'Phát nhạc trên Youtube/Spotify trong kênh thoại',
    voiceChannel: true,

    async run(client, message, args) {
        if (!args[0]) return message.reply(`Vui lòng nhập tên bài hát cần tìm hoặc URL nhạc!`);

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.reply(`Không tìm thấy kết quả về bài hát/URL này!`);

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return message.reply(`Bao-Chan Bot không vào được kênh thoại của bạn, vui lòng thử lại!`);
        }

        await message.reply(`Đợi tớ tí tớ đang tìm kiếm ${res.playlist ? 'danh sách nhạc này' : 'bài hát này'}... 🔎`);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};