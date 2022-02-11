const { getAudioUrl } = require('google-tts-api');
const voice = require('@discordjs/voice')
module.exports = {
    name: 'speak',
    category: '🔮-Chức năng',
    aliases: [],
    utilisation: '{prefix}speak',
    usage: '%speak [text]',
    descriptions: 'Chuyển chữ thành lời nói trong kênh thoại',
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

        const connection = voice.joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        })
        //create source
        const resource = voice.createAudioResource(audioURL)
        const player = voice.createAudioPlayer()
        
        
        
        try {
            //tạo âm thanh
            player.play(resource)
            connection.subscribe(player)
            
            setTimeout(() => {
                message.delete()
            }, 5000);
            
            //check nếu play xong thì out voice
            player.on(voice.AudioPlayerStatus.Idle, () => {
                // out kênh thoại
                // connection.destroy()
            })
        } catch(e) {
            message.channel.send('Bot lỗi, vui lòng thử lại sau!');
            console.error(e);
        };
        const msg = await message.channel.send('Đang chuyển chữ thành âm thanh...');

        setTimeout(() => msg.delete(), 5000);
    },
};
