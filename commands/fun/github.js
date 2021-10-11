const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'github',
    category: 'fun',
    run: async (client, message, args) => {
        let msg = await message.channel.send('Vui lòng chờ...');
        
        let body = await fetch (`https://api.github.com/users/${encodeURIComponent(args.join(' '))}`)
        const data = await body.json()
        if (!data) return message.channel.send('Lỗi vui lòng thử lại sau');
            let gEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`🚩Infomation about Github account`)
                .setTitle(`**৹ Name**: ${data.login}`)
                .setImage(data.avatar_url)
                .setDescription(`**Bio:** ${data.bio}\n**Account type:** ${data.account_type}\n **Company:** ${data.company}\n**Blog:** ${data.blog}\n**Location:** ${data.location}\n**Email:** ${data.email}\n**Twitter:** ${data.twitter}\n**Public repositories:** ${data.public_repos}\n**Followers:** ${data.followers}\n**Following:** ${data.following}`)
                .setFooter(`Bot: Duwc510_ by hongduccodedao`, client.user.displayAvatarURL)

        msg.edit({ content:'\u200b',embeds: [gEmbed] });
    }
}
