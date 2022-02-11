const array = require('../../SlashCommands/Fun/thinh.json').data;

module.exports = {
    name: 'thinh',
    descriptions: 'Xin thính!',
    aliases: ['xinthinh'],
    category: '🔮-Chức năng',
    usage: '%thinh',
    
    async run(client, message, args) {
        let radom = array[~~(Math.random() * array.length)];
        console.log(radom)
        return message.reply(radom);
    }
}