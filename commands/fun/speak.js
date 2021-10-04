const { getAudioUrl } = require('google-tts-api');
const voice = require('@discordjs/voice')
module.exports = {
    name: 'speak',
    category: 'fun',
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('Vui lòng nhập gì đó để bot nói!');
        const string = args.join(' ');
        if (string.length > 200) return message.channel.send('Vui lòng nhập dưới 200 kí tự!');

        if(!message.member.voice.channel) return message.reply('Bạn phải vào room voice để sử dụng lệnh này!');
        const audioURL = await getAudioUrl(string, {
            lang: 'vi',
            slow: false,
            host: 'https://translate.google.com',
            timeout: 10000,
        });
        
        try {
            //tạo source để play
            const resource = voice.createAudioResource(audioURL)
            const player = voice.createAudioPlayer()

            //kết nối voice
            const connection = voice.joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            })

            //play source
            player.play(resource)
            connection.subscribe(player)

            //check nếu play xong thì out voice
            player.on('idle', () => {
                //out kênh thoại
                connection.destroy()
            })
        }
        catch(e) {
            message.channel.send('Bot lỗi, vui lòng thử lại sau!');
            console.error(e);
        };
    },
};