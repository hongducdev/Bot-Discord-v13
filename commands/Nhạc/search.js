const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: ['sh','tim','timkiem'],
    category: 'Nhạc',
    utilisation: '{prefix}search [song name]',
    usage: '%search [tên bài hát]',
    descriptions: 'Phát nhạc theo danh sách tìm kiếm',
    voiceChannel: true,

    async run(client, message, args) {
        if (!args[0]) return message.reply(`Vui lòng nhập tên bài hát cần tìm kiếm 🔎`);

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.reply(`Không tìm thấy kết quả về bài hát!`);

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new MessageEmbed();

        embed.setColor('GREEN');
        embed.setAuthor(`Kết quả ${args.join(' ')}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nChọn lựa chọn từ **1** đến **${maxTracks.length}** hoặc **cancel** ⬇️`);

        embed.setTimestamp();
        embed.setFooter('Bot: Bao-Chan Bot by PinkDuwc._', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send(`Đã hủy tìm kiếm ✅`) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send(`Giá trị không hợp lý, thử lại với giá trị từ **1** đến **${maxTracks.length}** or **cancel**... thử lại ? ❌`);

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guild.id);
                return message.reply(`Bao-Chan Bot không vào được kênh thoại của bạn, vui lòng thử lại!`);
            }

            await message.reply(`Đợi tớ tí tớ đang tìm kiếm... 🔎`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.reply(`Hết thời gian chọn kết quả tìm kiếm ...`);
        });
    },
};