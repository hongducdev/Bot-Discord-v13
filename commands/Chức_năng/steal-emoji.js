const { Util } = require('discord.js')

module.exports = {
    name: 'steal-emoji',
    category: 'Chức_năng',
    aliases: ['steal'],
    utilisation: '{prefix}steal-emoji',
    usage: '%steal-emoji [emoji]',
    descriptions: 'Thêm emoji ở server khác vào server mình',

    async run (client, message, args) {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send('Bạn không có quyền làm việc này.')
        if(!args.length) return message.channel.send('Vui lòng nhập thêm 1 hoặc nhiều emoji.')

        for (const rawEmoji of args) {
            const parsedEmoji = Util.parseEmoji(rawEmoji);

            if(parsedEmoji.id) {
                const extension = parsedEmoji.animated? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;

                message.guild.emojis.create(url, parsedEmoji.name).catch((err) => {
                    message.channel.send('Máy chủ đã đến giới hạn thêm emoji.')
                    return;
                })
                    .then((emoji) => message.channel.send(`Đã thêm thành công emoji vào máy chủ với tên -> \`${emoji.name}\``))
            }
        }
    }
}