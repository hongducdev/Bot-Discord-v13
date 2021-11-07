const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'github',
    category: 'fun',
    run: async (client, message, args) => {
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đang tìm kiếm, vui lòng đợi...', 'https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
        let searching = await message.channel.send({embeds: [searchEmbed]})
        
        let body = await fetch (`https://api.github.com/users/${encodeURIComponent(args.join(' '))}`)
        const data = await body.json()
        const noData = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Có lỗi xảy ra trong quá trình thực hiện!`)
        if(!data) return searching.edit({embeds : [noData]})
            let gEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`🚩Infomation about Github account`)
                .setTitle(`**৹ Name**: ${data.login}`)
                .setImage(data.avatar_url)
                .setDescription(`**Bio:** ${data.bio}\n**Account type:** ${data.account_type}\n **Company:** ${data.company}\n**Blog:** ${data.blog}\n**Location:** ${data.location}\n**Email:** ${data.email}\n**Twitter:** ${data.twitter}\n**Public repositories:** ${data.public_repos}\n**Followers:** ${data.followers}\n**Following:** ${data.following}`)
                .setFooter(`Bot: Duwc510_ by hongduccodedao`, client.user.displayAvatarURL)

                return searching.edit({embeds: [gEmbed]})
    }
}
