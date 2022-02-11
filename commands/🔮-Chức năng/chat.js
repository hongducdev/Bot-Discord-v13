const fetch = require('node-fetch');

module.exports = {
    name: 'chat',
    aliases: [],
    category: '🔮-Chức năng',
    utilisation: '{prefix}chat',
    usage: '%chat [text]',
    descriptions: 'Chat với AI Chat',
    run: async(client, message, args) => {
        try {
            const res = await fetch(`https://api.simsimi.net/v2/?text=${encodeURIComponent(args.join(' '))}&lc=vn`);
            const data = await res.json()
            message.reply(data.success);
        }
        catch (e) {
            message.channel.send('Bot lỗi, vui lòng thử lại sau!');
        }
    }
}

