const Discord = require('discord.js')

module.exports = {
    name: 'steal-emoji',
    category: 'Chức_năng',
    aliases: [],
    utilisation: '{prefix}userinfo',

    async run (client, message, args) {
        // if(!message.member.permissions.has('KICK_MEMBERS')) return message.reply('You Do Not Have Permission To Use This Command!');
    
        if(!args.length) return message.reply('Please specify some Emoji\'s!');
    
        for (const rawEmoji of args) {
            const parsedEmoji = Discord.Util.parseEmoji(rawEmoji);
    
            if (parsedEmoji.id) {
                const extension = parsedEmoji.animated ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
            message.guild.emojis
            .create(url, parsedEmoji.name)
            .then((emoji) => message.channel.send({ content:`Successfully Added: \`${parsedEmoji.name}\` Emoji!` }));
            }
        }
    
    }
}