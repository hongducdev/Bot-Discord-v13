const  { checkSameRoom } = require('../../utils')
module.exports = {
    name: 'play',
    category: 'music',
    aliases: ['p'],
    description: 'Chơi nhạc từ youtube, spotify, soundcloud',
    run: async(client, message, args) => {
        if (checkSameRoom(message)) return;
        const query = args.join(' ');
        const queue = client.player.createQueue(message.guild, {
            metadata: message,
        });
        const result = await client.player.search(query, {
          requestedBy: message.author
        }).then(song => song.tracks[0]);
         
        try {
            await queue.connect(message.member.voice.channel);
        } catch {
            message.reply("Could not join your voice channel");
        }
        
        queue.play(result);
    }
}
