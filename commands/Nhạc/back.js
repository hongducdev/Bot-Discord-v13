const  { checkSameRoom } = require('../../utils')
module.exports = {
    name: 'back',
    aliases: [],
    category: 'Nhạc',
    usage: '%back',
    descriptions: 'Phát bài nhạc trước!',
    async run (client, message, args) {
        if (checkSameRoom(message)) return;
        const query = args.join(' ');
        const queue = client.player.createQueue(message.guild, {
            metadata: message,
        });
        if (!queue || !queue.playing) return message.reply(`Danh sách nhạc đang trống...`);
        
        await queue.back();
        const backEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Đã skip...`)
            .setDescription('✅ | Chơi lại bài hát trước đó!')
            .setTimestamp()
        return void message.channel.send({ embeds : [backEmbed]});
    }
}