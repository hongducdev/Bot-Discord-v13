const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
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


client.player.on('trackStart', (queue, track) => {
    const playingEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đang chơi...', 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif')
        .setThumbnail(track.thumbnail)
        .setDescription(`\n[**${track.title}**](${track.url})\n**Người thêm: ** ${track.requestedBy.tag}`)
        .setTimestamp()
    queue.metadata.channel.send({ embeds: [playingEmbed] })
});

client.player.on('trackAdd', (queue, track) => {
    const addEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`Đã thêm vào danh sách chờ...`)
        .setThumbnail(track.thumbnail)
        .setDescription(`\n✅ Đã thêm \`${track.title}\` vào danh sách chờ!`)
        .setTimestamp()
    queue.metadata.channel.send({ embeds: [addEmbed]} )
});

client.player.on('tracksAdd', (queue, tracks) => {
    const addsEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`Đã thêm vào danh sách chờ...`)
        .setDescription(`\n📃 Đã thêm \`${tracks.length}\` bài hát vào danh sách chờ!`)
        .setTimestamp()
    queue.metadata.channel.send({ embeds: [addsEmbed]} )
});

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
        if (['894604881653006346','756121714068422789','796375164338044931'].includes(message.channel.id)) {
            try {
                const res = await fetch(`https://api.simsimi.net/v2/?text=${encodeURIComponent(message.content)}&lc=vn`);
                const data = await res.json()
                message.reply(data.success);
            }
            catch(e) {
                message.reply('Bot đang lỗi đó chờ tí đi!');
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
