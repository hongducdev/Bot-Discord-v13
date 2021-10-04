const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags');

module.exports = {
    name: 'help',
    category: 'user',
    description: 'Hưỡng dẫn cách xài lệnh',
    usage: 'l!help [Tên lệnh]',
    run: async(client, message, args) => {
        if (!args[0]) return getAll(client, message);
    },
}

function getAll(client, message) {
    const embed = new MessageEmbed()
        .setColor ('GREEN')
        .setAuthor('Sử dụng %help để xem hưỡng dẫn sử dụng bot Duwc510._')

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


