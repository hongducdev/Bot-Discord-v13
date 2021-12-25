const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'google',
    aliases: [],
    category: 'Chức_năng',
    usage: '%google [thông tin muốn tìm kiếm]',
    descriptions: 'Hiển thị kết quả theo thông tin muốn tìm kiếm trên Google',
    
    async run (client, message, args) {
        const search = args[0];
        const link = `https://google.com/search?q=${encodeURIComponent(search)}`
        const embed = new MessageEmbed()
        .setAuthor('Thông tin Bao-Chan Bot', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setTitle(`Google Search 🔎`)
        .addField(`Đang tìm kiếm Google về ${search}`,`[Ấn vào đây](${link})`)
        .setColor('GREEN')
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        return message.reply({embeds: [embed]})
    }
}