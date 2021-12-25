module.exports = {
    name: 'save',
    aliases: ['sv'],
    utilisation: '{prefix}save',
    usage: '%save',
    descriptions: 'Lưu bài hát',
    voiceChannel: true,

    async run(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply(`Danh sách nhạc đang trống...`);

        message.author.send(`Bạn đã lưu bản nhạc ${queue.current.title} | ${queue.current.author} từ máy chủ ${message.guild.name} ✅`).then(() => {
            message.channel.send(`Tôi đã gửi cho bạn tên của bản nhạc bằng tin nhắn riêng tư ✅`);
        }).catch(error => {
            message.reply(`Không thể gửi cho bạn một tin nhắn riêng tư ❌`);
        });
    },
};