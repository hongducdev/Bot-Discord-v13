const { MessageEmbed, CommandInteraction } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'instagram',
    description: 'Hiện thị thông tin tài khoản Instagram theo tên người đùng',
    options:[
        {
            name: "name",
            description: "Nhập tên người dùng!",
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
        const name_insta = interaction.options.getString('name');
        const url = await fetch(`https://api.popcat.xyz/instagram?user=${encodeURIComponent(`${name_insta}`)}`)
        const data = await url.json()
        .then(data=> {
            const noData = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Không tìm thấy tài khoản này, vui lòng thử lại!`)
            if(!data) return interaction.reply({embeds: [noData]})

            const DataEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTimestamp()
            .setThumbnail(data.profile_pic)
            .addField(`**Username**`, `\`${data.username}\``, true)
            .addField(`**Full name**`, `\`${data.full_name}\``, true)
            .addField(`**Bio**`, `\`${data.biography}\``)
            .addField(`**Posts**`, `\`${data.posts}\``, true)
            .addField(`**Reels**`, `\`${data.reels}\``,true)
            .addField(`**Followers**`, `\`${data.followers}\``, true)
            .addField(`**Followings**`, `\`${data.following}\``, true)
            .addField(`**Private**`, `\`${data.private ? "Yes✅" : "No⛔"}\``, true)
            .addField(`**Verified**`, `\`${data.verified ? "Yes✅" : "No⛔"}\``, true)

            return interaction.followUp({embeds: [DataEmbed]})
        })
    }
}