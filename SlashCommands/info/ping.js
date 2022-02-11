const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { connection } = require('mongoose');
require('../../handler/index');

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`**Client:**\`🟢 ONLINE \` - \`${client.ws.ping}ms\`\n**Uptime:** <t:${parseInt(client.readyTimestamp /1000)}:R>\n
        **Database:** \`${switchTo(connection.readyState)}\``)

        return interaction.followUp({embeds: [embed]})
    },
};

function switchTo(val) {
    var status = " ";
    switch(val) {
        case 0: status = "🔴 ĐẴ NGẮT KẾT NỐI"
        break;
        case 1: status = "🟢 ĐÃ KẾT NỐI"
        break;
        case 2: status = "🟠 ĐANG KẾT NỐI"
        break;
        case 3: status = "🟣 ĐANG NGẮT KẾT NỐI"
        break;
    }
    return status;
}