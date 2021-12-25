const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    category: 'Nhạc',
    utilisation: '{prefix}nowplaying',
    usage: '%nowplaying',
    descriptions: 'Hiển thị thông tin bài nhạc đang phát',
    voiceChannel: true,

    async run(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply(`Danh sách nhạc đang trống...`);

        const track = queue.current;

        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setThumbnail(track.thumbnail);
        embed.setAuthor('Đang phát', client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'Vô hạn (trực tiếp)' : track.duration;
        const progress = queue.createProgressBar();

        embed.setDescription(`[**${track.title}**](${track.url})`);

        embed.addField(`**Âm lượng:**`,`\`${queue.volume}\``,true);
        embed.addField(`**Thời gian:**`,`\`${trackDuration}\``,true);
        embed.addField(`**Chế độ lắp:**`,`\`${methods[queue.repeatMode]}\``,true);
        embed.addField(`**Đã phát được:**`,`\`${timestamp.progress}%\``,true);
        embed.addField(`**Yêu cầu bởi:**`,`\`${track.requestedBy}\``,true)
        embed.setTimestamp();
        embed.setFooter('Bot: Bao-Chan Bot by PinkDuwc._', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed]});
    },
};