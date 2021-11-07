// const {MessageEmbed} = require('discord.js');
// const fetch = require('node-fetch');
// module.exports = {
//     name: 'xe',
//     category: 'Image',
//     utilisation: '{prefix}xe',
//     run: async (client, message, args) => {
//         let msg = await message.channel.send('Vui lòng chờ...');
        
//         const rd = Math.floor(Math.random() * 6137)
//         const url = encodeURI(`https://api.tumblr.com/v2/blog/wroom.tumblr.com/photo?api_key=('zsvGwqypDdeLNBoQspQPbGWZ3QbRoy8JuBgx13ow5uHBU3Gu8L')&api_secret=('xaG4qy1hioJjkIIXPgHjYSm8vWzNru555XnyHKJJHAJHM3NCjL')&limit=1&offset=${rd}`)
//         await fetch(url)
//         .then(res => res.json())
//         .then(json => {
            //không trả về thì gửi về embed lỗi
            // const noData = new MessageEmbed()
            // .setColor('RANDOM')
            // .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh!`)
            // if(!json.response) return msg.edit({embeds : [noData]})

            //nếu có thì trả về ảnh
        //     const imageEmbed = new MessageEmbed()
        //     .setColor('GREEN')
        //     .setDescription(`**${json.response.posts[0].summary.title}**`)
        //     .setImage(`${json.response.posts[0].photos[0].original_size.url}`)
        //     .setThumbnail()
        //     .setFooter(`Bot: Duwc510_ by hongduccodedao`, client.user.displayAvatarURL)
            
        //     return msg.edit({embeds: [imageEmbed]})
        // })
        // msg.edit({ content:'\u200b',embeds: [carEmbed] });
//     },
// };