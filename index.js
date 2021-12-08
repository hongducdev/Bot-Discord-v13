const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
const fetch = require('node-fetch');
const { readdirSync } = require('fs');
const { Player } = require('discord-player');
const { token } = require('./config.json');
const player = new Player (client, {
    ytdDownloadOptions: {filter: "audioonly"},
});

client.player = player;

const activities = [
{ name: 'hongduccodedao.cf', type: 'STREAMING' }
];

client.on("ready", () => {
    console.log (`${client.user.username} đã sẵn sàng hoạt động`);

    // Set the client user's presence
    // client.user.setPresence({ activities: [{ name: 'Tại Server Bao Chẩn: `https://dsc.gg/baochanthanhthien`', type: 'PLAYING'}], status: 'online' });
    client.user.setPresence({ status: 'online', activity: activities[0] });
    let activity = 1;
    setInterval(() => {
        activities[2] = { name: `${client.channels.cache.size} Kênh`, type: 'WATCHING' };
        activities[3] = { name: `${client.users.cache.size} Users`, type: 'WATCHING' };
        if (activity > 3) activity = 0;
        client.user.setActivity(activities[activity]);
        activity++;
    }, 5000);
});

client.player.on('trackStart', (queue, track) => {
    const playingEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đang chơi...', 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif')
        .setThumbnail(track.thumbnail)
        .setDescription(`\n[**${track.title}**](${track.url})\n**Thời gian **${track.duration}\n**Được yêu cầu bởi: ** ${track.requestedBy}`)
        .setTimestamp()
    queue.metadata.send({ embeds: [playingEmbed] })
});

client.player.on('trackAdd', (queue, track) => {
    const addEmbed = new MessageEmbed()
        .setAuthor(`Thêm vào danh sách phát`,client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setColor('GREEN')
        .setThumbnail(track.thumbnail)
        .setDescription(`\n✅ Đã thêm \`${track.title}\` vào danh sách chờ!`)
        .setTimestamp()
    queue.metadata.send({ embeds: [addEmbed]} )
});

client.player.on('tracksAdd', (queue, tracks) => {
    const addsEmbed = new MessageEmbed()
        .setAuthor(`Thêm vào danh sách phát`,client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setColor('GREEN')
        .setDescription(`\n📃 Đã thêm \`${tracks.length}\` bài hát vào danh sách chờ!`)
        .setTimestamp()
    queue.metadata.send({ embeds: [addsEmbed]} )
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    const prefix = 'dv';
    if(!message.content.startsWith(prefix)) {
        if (message.channel.id == '903582862626942976') {
            const res = await fetch(`https://api.simsimi.net/v2/?text=${encodeURIComponent(message.content)}&lc=vn`);
            const data = await res.json()
            message.reply(data.success);
        }
    }
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args);
});

client.login(token);
