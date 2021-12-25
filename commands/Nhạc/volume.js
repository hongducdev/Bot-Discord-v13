const { maxVol } = require('../../config.json')

module.exports = {
    name: 'volume',
    aliases: ['vol'],
    category: 'Nhạc',
    usage: `%volume [1-${maxVol}]`,
    descriptions: 'Chỉnh âm lượng của Bot',
    voiceChannel: true,

    async run(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply(`Danh sách nhạc đang trống...`);

        const vol = parseInt(args[0]);

        if (!vol) return message.reply(`Âm lượng hiện tại: ${queue.volume} 🔊\n*Để thay đổi âm lượng vui lòng nhập một giá trị trong khoảng **1** đến **${maxVol}**.*`);

        if (queue.volume === vol) return message.reply(`Âm lượng bạn muốn thay đổi đã là âm lượng hiện tại!`);

        if (vol < 0 || vol > maxVol) return message.reply(`Giá trị không đúng vui lòng nhập một giá trị trong khoảng **1** đến **${maxVol}** ${message.author}... thử lại ? ❌`);

        const success = queue.setVolume(vol);

        return message.reply(success ? `Âm lượng đã thay đổi: **${vol}**/**${maxVol}**% 🔊` : `Đã xảy ra lỗi ❌`);
    }
}