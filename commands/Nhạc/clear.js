module.exports = {
    name: 'clear',
    aliases: ['cq'],
    category: 'Nhạc',
    utilisation: '{prefix}clear',
    usage: '%clear',
    descriptions: 'Xóa danh sách nhạc trong danh sách chờ',
    voiceChannel: true,

    async run(client, message) {
        const queue = client. player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply(`Danh sách nhạc đang trống...`);

        if (!queue.tracks[0]) return message.channel.send(`Không có nhạc nào trong hàng đợi sau nhạc hiện tại ${message.author}... thử lại ? ❌`);

        await queue.clear();

        message.channel.send(`Hàng đợi vừa được xóa 🗑️`);
    },
};