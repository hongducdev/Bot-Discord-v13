const {MessageEmbed} = require('discord.js');  
module.exports = {
    name: "restart",
    category: "🔱-Owner",
    description: "Restarts the bot",
    usage: "restart",
    run: async (client, message, args) => {
        if(message.author.id != "769244837030526976") return message.channel.send("You do not have permission to use this command!")
        message.channel.send("Restarting...")
        process.exit(1);
    }
}
