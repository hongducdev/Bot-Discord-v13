const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    category: 'Nhạc',
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,

    async run(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Danh sách nhạc dangd trống ${message.author}... thử lại ? ❌`);

        const track = queue.current;

        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setThumbnail(track.thumbnail);
        embed.setAuthor('Đang phát', client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'Vô hạn (trực tiếp)' : track.duration;
        const progress = queue.createProgressBar();

        embed.setDescription(`[**${track.title}**](${track.url})\nÂm lượng **${queue.volume}**%\nThời gian **${trackDuration}**\nChế độ lặp **${methods[queue.repeatMode]}**\nĐược yêu cầu bởi ${track.requestedBy}\nĐã phát được: **${timestamp.progress}**%`);

        embed.setTimestamp();
        embed.setFooter('Bot: Bao-Chan Bot by PinkDuwc._', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed]});
    },
};