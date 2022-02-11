const { MessageEmbed, CommandInteraction } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'steam',
    description: 'Hiện thị thông tin sản phẩm trên Steam',
    options:[
        {
            name: "name",
            description: "Nhập tên sản phẩm!",
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
        const name_steam = interaction.options.getString('name');
        const url = await fetch(`https://api.popcat.xyz/steam?q=${name_steam}`)
        const data = await url.json()

        const res = await fetch(`https://api.popcat.xyz/translate?to=vi&text=${data.description}`)
        const data1 = await res.json()

            //nếu có thì trả về ảnh
            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(` Thông tin của ${data.name}`)
            .addField(`**Tên sản phẩm**`,`\`${data.name}\``, true)
            .addField(`**Nhà sản xuất**`,`\`${data.publishers}\``, true)
            .addField(`**Thể loại**`,`\`${data.type}\``, true)
            .addField(`**Giá**`,`\`${data.price}\``, true)
            .addField(`**Lập trình viên**`,`\`${data.developers}\``, true)
            .addField(`**Website**`,`[Link](${data.website})`, true)
            .addField(`**Mô tả**`,`${data1.translated}`, false)
            .setImage(data.banner)
            
            return interaction.followUp({embeds: [embed]})
    }
}
