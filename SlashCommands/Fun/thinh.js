const { CommandInteractin, Client } = require('discord.js');
const array = require('./thinh.json').data;

module.exports = {
    name: 'thinh',
    description: 'Xin thính!',
    /**
     * @param {CommandInteractin} interaction
     * @param {Client} client
     * @param {String[]} args
     */
    run: async(client, interaction, args) => {
        let random = array[~~(Math.random() * array.length)];
        // console.log(random);
        return interaction.followUp(random)
    }
}
