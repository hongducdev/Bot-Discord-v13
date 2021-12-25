const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'github',
    category: 'Chức_năng',
    aliases: [],
    utilisation: '{prefix}github',
    usage: '%github [tên tài khoản]',
    descriptions: 'Hiển thị thông tin tài khoản Github',
    run: async (client, message, args) => {
        let searchEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đang tìm kiếm, vui lòng đợi...', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        let searching = await message.channel.send({embeds: [searchEmbed]})
        const url = await fetch(`https://api.github.com/users/${encodeURIComponent(args.join(' '))}`)
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
            .setAuthor('Bao-Chan Bot', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .addField(`**Tên Github:**`,`\`${data.login}\``,true)
            .addField(`**Tên:**`,`\`${data.name}\``,true)
            .addField(`**Id:**`,`\`${data.id}\``,true)
            .addField(`**Tài khoản:**`,`\`${data.type}\``,true)
            .addField(`**Công ty:**`,`\`${data.company}\``,true)
            .addField(`**Blog:**`,`\`${data.blog}\``,true)
            .addField(`**Địa điểm:**`,`\`${data.location}\``,true)
            .addField(`**Email:**`,`\`${data.email}\``,true)
            .addField(`**Bio:**`,`\`${data.bio}\``,true)
            .addField(`**Tài khoản Twitter:**`,`\`${data.twitter_username}\``,true)
            .addField(`**Số Repo mở:**`, `\`${data.public_repos}\``,true)
            .addField(`**Người theo dõi:**`, `\`${data.followers}\``,true)
            .addField(`**Đang theo dõi:**`, `\`${data.following}\``,true)
            .addField(`**Tham gia:**`,`\`${data.created_at}\``,true)
            .setThumbnail(data.avatar_url)
            .setTimestamp()
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            
            return searching.edit({ embeds: [imageEmbed] })
        })
    }
}
