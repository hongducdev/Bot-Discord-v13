const { Client, MessageEmbed, ContextInteraction } = require("discord.js");

module.exports = {
    name: "Avatar",
    description: "Hiển thị avatar của người dùng",
    type: 'USER',
    /**
     * @param {Client} client
     * @param {ContextInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const user = await client.users.fetch(interaction.targetId);

        console.log(user.username);

        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`${user.username}'s avatar`)
        .setDescription(`[Tải xuống tại đây](${user.displayAvatarURL({dynamic: true, size: 1024})})`)
        .setImage(user.displayAvatarURL({dynamic: true, size: 1024}))
        
        return interaction.followUp({embeds: [embed]});
    },
};
