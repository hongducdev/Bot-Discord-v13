const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
const fetch = require('node-fetch');
const { readdirSync } = require('fs');
const { Player } = require('discord-player');
const { token } = require('./config.json');
const keepAlive = require("./server")
const player = new Player (client, {
    ytdDownloadOptions: {filter: "audioonly"},
});

client.player = player;

const activities = [
{ name: 'Server Bao Chẩn', type: 'STREAMING' }, 
{ name: '%help', type: 'STREAMING' },
{ name: 'Giải_trí_cùng_nhau', type: 'STREAMING'}
];

client.on("ready", () => {
    console.log (`${client.user.username} đã sẵn sàng hoạt động`);
    let mcount = 0; 
    client.guilds.cache.forEach((guild) => {
        mcount += guild.memberCount 
    })

    // Set the client user's presence
    // client.user.setPresence({ activities: [{ name: 'Tại Server Bao Chẩn: `https://dsc.gg/baochanthanhthien`', type: 'PLAYING'}], status: 'online' });
    client.user.setPresence({ type:'STREAMING', url: "https://www.twitch.tv/hongduccodedao",activity: activities[0] });
    let activity = 1;
    setInterval(() => {
        activities[2] = { name: `${client.channels.cache.size} Kênh`, type: 'STREAMING' };
        activities[3] = { name: `${mcount} Người dùng`, type: 'STREAMING' };
        if (activity > 3) activity = 0;
        client.user.setActivity(activities[activity]);
        activity++;
    }, 5000);
});

client.on('warn', console.warn);
client.on('error', console.error);
client.on('disconnect', () => console.log('I disconnected!'));
client.on('reconnecting', () => console.log('I am disconnecting!'));

const methods = ['disabled/tắt', 'track/bài hát', 'queue/danh sách nhạc'];
client.player.on('trackStart', (queue, track) => {
    const playingEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Đang chơi...', 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif')
        .setThumbnail(track.thumbnail)
        .setDescription(`\n[**${track.title}**](${track.url})`)
        .addField(`**Tác giả:**`, `\`${track.author}\``, true)
        .addField(`**Thời gian:**`, `\`${track.duration}\``, true)
        .addField(`**Yêu cầu bởi:**`, `${track.requestedBy}`,true)
        .addField(`**Âm lượng:**`, `\`${queue.volume}\``, true)
        .addField(`**Chế độ lặp:**`, `\`${methods[queue.repeatMode]}\``, true)
        .setTimestamp()
    queue.metadata.send({ embeds: [playingEmbed] })
});

client.player.on('trackAdd', (queue, track) => {
    const addEmbed = new MessageEmbed()
        .setAuthor(`Thêm vào danh sách phát`,client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setColor('GREEN')
        .setThumbnail(track.thumbnail)
        .setDescription(`\nĐã thêm [**${track.title}**](${track.url}) vào danh sách chờ!`)
        .addField(`**Tác giả:**`, `\`${track.author}\``, true)
        .addField(`**Thời gian:**`, `\`${track.duration}\``, true)
        .addField(`**Yêu cầu bởi:**`, `${track.requestedBy}`,true)
        .setTimestamp()
    queue.metadata.send({ embeds: [addEmbed]} )
});

client.player.on('tracksAdd', (queue, tracks) => {
    const addsEmbed = new MessageEmbed()
        .setAuthor(`Thêm vào danh sách phát`,client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setColor('GREEN')
        .setDescription(`\nĐã thêm **${tracks.length}** bài hát vào danh sách chờ!`)
        .setTimestamp()
    queue.metadata.send({ embeds: [addsEmbed]} )
});

client.player.on('finish', (message) => {
    const embed = new MessageEmbed()
    .setColor ('ORANGE')
    .setTitle(`Đã ngắt kết nối...`)
    .setDescription(`**Bao-Chan Bot đi đây, hẹn gặp ${message.author} sau nha!**`)
    .setTimestamp()
    .setFooter('Bot: Bao-Chan Bot by PinkDuwc._', message.author.avatarURL({ dynamic: true }));
    message.reply({embeds: [embed]});
});

client.player.on('error', (message,err) => {
    message.channel.send(`Đã xảy ra lỗi.\n${err}`)
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
    if(!message.content.startsWith(prefix)) {
        if (message.channel.id == 'id phòng set chat không cần lệnh %chat') {
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

keepAlive();
client.login(token);
