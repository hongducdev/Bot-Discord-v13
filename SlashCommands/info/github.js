const { MessageEmbed, CommandInteraction } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'github',
    description: 'Hiện thị thông tin tài khoản Github theo tên người dùng!',
    options:[
        {
            name: "name",
            description: "Nhập tên người dùng",
            type: "STRING",
            required: true,
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
     run: async (client, interaction, args) => {
        const name_github = interaction.options.getString('name');
        const url = await fetch(`https://api.github.com/users/${name_github}`)
        const data = await url.json()
        .then(data=> {
            //không trả về thì gửi về embed lỗi
            const noData = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình tìm!`)
            if(!data) return interaction.reply({embeds : [noData]})

            //nếu có thì trả về ảnh
            const imageEmbed = new MessageEmbed()
            .setColor('GREEN')
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
            
            return interaction.followUp({ embeds: [imageEmbed] })
        })
    }
}
