const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    category: 'Nhạc',
    utilisation: '{prefix}queue',
    voiceChannel: true,

    async run(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`Không có bài hát nào đang phát ${message.author}... thử lại ? ❌`);

        if (!queue.tracks[0]) return message.channel.send(`Không có nhạc nào trong hàng đợi sau nhạc hiện tại ${message.author}... thử lại ? ❌`);

        const embed = new MessageEmbed();
        const methods = ['', '🔁', '🔂'];

        embed.setColor('GREEN');
        embed.setThumbnail(queue.current.thumbnail);
        embed.setAuthor(`Danh sách phát - ${message.guild.name} ${methods[queue.repeatMode]}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - [${track.title}](${track.url}) | ${track.author} (Yêu cầu bởi : ${track.requestedBy})`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `Và **${songs - 5}** bài hát khác...` : `Trong danh sách phát **${songs}** bài hát...`;

        embed.setDescription(`**Hiện tại đang phát** [${queue.current.title}](${queue.current.url})\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();
        embed.setFooter('Bot: Bao-Chan Bot by PinkDuwc._', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });
    },
};