const { CommandInteraction, MessageEmbed } = require('discord.js')


module.exports = {
    name: "avatar",
    description: "Embeds the target member's avatar.",
    options:[
        {
            name: "target",
            description: "Select a target.",
            type: "USER",
            required: true,
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const Target = interaction.options.getUser('target');
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`${Target.username}'s avatar`)
        .setDescription(`[Tải xuống tại đây](${Target.displayAvatarURL({dynamic: true, size: 1024})})`)
        .setImage(`${Target.displayAvatarURL({dynamic: true, size: 1024})}`)

        interaction.followUp({embeds: [embed]})
    }
}