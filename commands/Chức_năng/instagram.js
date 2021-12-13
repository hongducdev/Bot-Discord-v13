const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'instagram',
    category: 'Chức_năng',
    aliases: ['insta'],
    utilisation: '{prefix}insta',
    run: async (client, message, args) => {
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đang tìm kiếm, vui lòng đợi...', 'https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
        let searching = await message.channel.send({embeds: [searchEmbed]})
        const url = await fetch(`https://api.popcat.xyz/instagram?user=${encodeURIComponent(args.join(' '))}`)
        const data = await url.json()
        .then(data=> {
            //không trả về thì gửi về embed lỗi
            const noData = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình tìm!`)
            if(!data) return searching.edit({embeds : [noData]})

            //nếu có thì trả về ảnh
            const imageEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor('Instagram','https://cdn.discordapp.com/emojis/892292745916481556.gif?size=128')
            .setThumbnail(data.profile_pic)
            .setTitle(`Tên đầy đủ: ${data.full_name}`)
            .setDescription(`
            **-Tên người dùng: ** [${data.username}](https://www.instagram.com/${data.username})\n
            **-Bio: ** ${data.biography}\n
            **-Số lượng bài viết: ** ${data.posts}\n
            **-Người theo dõi: ** ${data.followers}\n
            **-Đang theo dõi: ** ${data.following}\n
            **-Tài khoản khóa: ** ${data.private ? "Có ✅" : "Không ❌"}\n
            **-Tài khoản được xác minh: ** ${data.verified ? "Có ✅" : "Không ❌"}
            `)
            .setTimestamp()
            .setFooter(`Bot: Bot: Bao-Chan Bot by PinkDuwc._`, client.user.displayAvatarURL)
            
            return searching.edit({ embeds: [imageEmbed] })
        })
    }
}
