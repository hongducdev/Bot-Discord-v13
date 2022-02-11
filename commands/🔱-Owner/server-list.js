const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'server-list',
    category: '🔱-Owner',
    aliases: ['serverlist', 'server-list', 'server-list-owner', 'serverlist-owner', 'serverlist-owner'],
    description: 'Hiển thị danh sách server của bot',

    async run(client, message, args) {
        if(message.author.id != '769244837030526976') {
            message.reply({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('🚫 | Bạn không có quyền thực hiện hành động này!')
            ]})
        } else {
            const guilds = client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .first(50)

            const description = guilds.map((guild, index) => {
                return `${index + 1}. ${guild.name} - ${guild.id} - ${guild.memberCount} thành viên`
            }).join('\n')

            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Danh sách server của bot')
            .setDescription(description)
            .setFooter(`Tổng số server: ${client.guilds.cache.size}`)

            message.channel.send({ embeds: [embed]})
        }
    }
}
