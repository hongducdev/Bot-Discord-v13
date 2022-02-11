const { Client, Collection } = require("discord.js");
const { readdirSync } = require('fs');

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
client.aliases = new Collection();
client.categories = readdirSync("./commands/");

// Initializing the project
require("./handler")(client);

[client.config.antiCrash ? "antiCrash" : null].filter(Boolean).forEach(handler => {
    require(`./handler/${handler}`)(client);
})

client.login(client.config.token);
