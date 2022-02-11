const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "leaveserver",
    category: "🔱-Owner",
    aliases: ["lesv"],
    descriptions: "Bot thoát khỏi server",

    async run(client,message, args) {
        if(message.author.id != '769244837030526976') {
            return message.reply('Bạn không có quyền sử dụng lệnh này!');
        } else {
            const guild = client.guilds.cache.get(args.join(' '));
            try {
                if(!guild) {
                    return message.reply ({embeds: [
                        new MessageEmbed()
                        .setColor('RED')
                        .setDescription(`🚫 | Không tìm thấy server!`)
                    ]})
                };

                await guild.leave();
                return message.reply ({embeds: [
                    new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`✅ | Bot đã thoát khỏi server ${guild.name} - ${guild.id} - ${guild.memberCount} thành viên!`)
                ]})
            } catch (error) {
                console.log(error);
            }
        }
    }
}