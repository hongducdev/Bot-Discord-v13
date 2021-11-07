const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags');

module.exports = {
    name: 'help',
    category: 'user',
    description: 'Hưỡng dẫn cách xài lệnh',
    usage: '%help [Tên lệnh]',
    run: async(client, message, args) => {
        if (!args[0]) return getAll(client, message);
    },
}

function getAll(client, message) {
    const embed = new MessageEmbed()
    .setColor ('GREEN')
    .setAuthor('Lệnh của Đặc Vụ Con Mèo!', 'https://cdn.discordapp.com/avatars/809665557595029514/26d6026a8999165d391ad7c65698d556.png?size=100')
    .setTitle(`**Prefix: % + Lệnh bạn muốn dùng.**`)
    .setTimestamp()
    .setFooter(`Bot: Đặc Vụ Con Mèo by hongduccodedao`, client.user.displayAvatarURL)


    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${cmd.name}\``)
            .join(',')
    }

    const info = client.categories
        .map(cat => stripIndent`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" +category);

    return message.channel.send({ embeds: [embed.setDescription(info)] });
}





