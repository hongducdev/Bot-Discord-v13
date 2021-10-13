const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
const { readdirSync } = require('fs');
const fetch = require('node-fetch');
const { Player } = require('discord-player');
const { token } = require('./config.json');
const player = new Player (client, {
    ytdDownloadOptions: {filter: "audioonly"},
});

client.player = player;

client.on("ready", () => {
    console.log (`${client.user.username} đã sẵn sàng hoạt động`);

    // Set the client user's presence
    client.user.setPresence({ activities: [{ name: '%help', type: 'PLAYING'}], status: 'online' });
});

client.player.on('trackStart', (queue, track) => queue.metadata.channel.send(`🎶 Đang chơi bài \`${track.title}\`...`));
client.player.on('trackAdd', (queue, track) => queue.metadata.channel.send(`✅ Đã thêm \`${track.title}\` vào danh sách chờ!`));
client.player.on('tracksAdd', (queue, tracks) => queue.metadata.channel.send(`📃 Đã thêm \`${tracks.length}\` bài hát vào danh sách chờ!`));

client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    const prefix = '%';
    if (!message.content.startsWith(prefix)) {
        if (message.channel.id == '894240549966602261' || '893401082712182784') {
            try {
                const res = await fetch(`https://api.simsimi.net/v2/?text=${encodeURIComponent(message.content)}&lc=vn`);
                const data = await res.json()
                message.channel.send(data.success);
            }
            catch(e) {
                message.channel.send('Đang lỗi đó chờ tí đi!');
            }
        }
    }
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        // if (command.category === 'music' && !message.member.voice.channel) return message.channel.send('Vui lòng vào room voice để sử dụng lệnh!');
        command.run(client, message, args);
    }
});

client.login(token);
