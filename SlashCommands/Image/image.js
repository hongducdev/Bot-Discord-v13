const { Client, CommandInteraction, MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const { readdirSync, readFileSync } = require('fs');
const { api_key } = require('../../config.json')

module.exports = {
    name: 'image',
    description: 'hiển thị hình ảnh theo lựa chọn',
    options: [
        {
            name: 'type',
            description: 'Chọn thể loại muốn hiển thị!',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'girl',
                    value: 'girl'
                },
                {
                    name: 'boy',
                    value: 'boy'
                },
                {
                    name: 'car',
                    value: 'car'
                },
                {
                    name: 'cat',
                    value: 'cat'
                },
                {
                    name: 'dog',
                    value: 'dog'
                },
                {
                    name: 'food',
                    value: 'food'
                },
                {
                    name: 'meme',
                    value: 'meme'
                },
                {
                    name: 'panda',
                    value: 'panda'
                },
                {
                    name: 'redpanda',
                    value: 'redpanda'
                },
                {
                    name: 'setup',
                    value: 'setup'
                },
                {
                    name: 'shiba',
                    value: 'shiba'
                },
                {
                    name: 'wallpaper',
                    value: 'wallpaper'
                },
            ],
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, args) => {
        const type = interaction.options.getString('type');
        const embed = new MessageEmbed()
        .setColor('RED')
        .setDescription('Vui lòng chọn thể loại để hiển thị')
        if (!args[0]) {
            return interaction.followUp({embeds: [embed]})
        }
        if (type === 'girl') {
            const rd = Math.floor(Math.random() * 941)
            const url = encodeURI(`https://api.tumblr.com/v2/blog/gaixinhchonloc.com/posts/photo?api_key=${api_key}&limit=1&offset=${rd}`)
            await fetch(url)
            .then (res => res.json())
            .then(json => {
                const noData = new MessageEmbed()
                .setColor('RED')
                .setDescription(`Không tìm thấy hình ảnh, vui lòng thử lại!`)
                if(!json) return interaction.followUp({embeds: [noData]})

                const DataEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setTimestamp()
                .setDescription(`${json.response.posts[0].summary}`)
                .setImage(`${json.response.posts[0].photos[0].original_size.url}`)

                return interaction.followUp({embeds: [DataEmbed]})
            })
        };
        if (type === 'boy') {
            const rd = Math.floor(Math.random() * 1000)
            const url = encodeURI(`https://api.tumblr.com/v2/blog/hot-t-boys/posts/photo?api_key=${api_key}&limit=1&offset=${rd}`)
            await fetch(url)
            .then (res => res.json())
            .then(json => {
                const noData = new MessageEmbed()
                .setColor('RED')
                .setDescription(`Không tìm thấy hình ảnh, vui lòng thử lại!`)
                if(!json) return interaction.followUp({embeds: [noData]})

                const DataEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setTimestamp()
                .setDescription(`${json.response.posts[0].summary}`)
                .setImage(`${json.response.posts[0].photos[0].original_size.url}`)

                return interaction.followUp({embeds: [DataEmbed]})
            })
        };
        if (type === 'car') {
            const rd = Math.floor(Math.random() * 6137)
            const url = encodeURI(`https://api.tumblr.com/v2/blog/wrooom.tumblr.com/posts/photo?api_key=${api_key}&limit=1&offset=${rd}`)
            await fetch(url)
            .then (res => res.json())
            .then(json => {
                const noData = new MessageEmbed()
                .setColor('RED')
                .setDescription(`Không tìm thấy hình ảnh, vui lòng thử lại!`)
                if(!json) return interaction.followUp({embeds: [noData]})

                const DataEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setTimestamp()
                .setDescription(`${json.response.posts[0].summary}`)
                .setImage(`${json.response.posts[0].photos[0].original_size.url}`)

                return interaction.followUp({embeds: [DataEmbed]})
            })
        };
        if (type === 'dog') {
            const url = await fetch(`https://some-random-api.ml/animal/dog`)
            const data = await url.json()
                //không trả về thì gửi về embed lỗi
                const noData = new MessageEmbed()
                .setColor('RED')
                .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh!`)
                if(!data) return interaction.followUp({embeds : [noData]})

                const res = await fetch(`https://api.popcat.xyz/translate?to=vi&text=${data.fact}`)
                const data1 = await res.json()

                //nếu có thì trả về ảnh
                const imageEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setURL(data.url)
                .setDescription(`**Tiêu đề:** ${data1.translated}\n [Tải xuống ở đây](${data.image})`)
                .setImage(data.image)
                
                return interaction.followUp({embeds: [imageEmbed]})
        };
        if(type === 'cat') {
            const url = await fetch(`https://some-random-api.ml/animal/cat`)
            const data = await url.json()
                //không trả về thì gửi về embed lỗi
                const noData = new MessageEmbed()
                .setColor('RED')
                .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh!`)
                if(!data) return interaction.followUp({embeds : [noData]})

                const res = await fetch(`https://api.popcat.xyz/translate?to=vi&text=${data.fact}`)
                const data1 = await res.json()

                //nếu có thì trả về ảnh
                const imageEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setURL(data.url)
                .setDescription(`**Tiêu đề:** ${data1.translated}\n [Tải xuống ở đây](${data.image})`)
                .setImage(data.image)
                
                return interaction.followUp({embeds: [imageEmbed]})
        };
        if (type === 'panda') {
            const url = await fetch(`https://some-random-api.ml/animal/panda`)
            const data = await url.json()
                //không trả về thì gửi về embed lỗi
                const noData = new MessageEmbed()
                .setColor('RED')
                .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh!`)
                if(!data) return interaction.followUp({embeds : [noData]})

                const res = await fetch(`https://api.popcat.xyz/translate?to=vi&text=${data.fact}`)
                const data1 = await res.json()

                //nếu có thì trả về ảnh
                const imageEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setURL(data.url)
                .setDescription(`**Tiêu đề:** ${data1.translated}\n [Tải xuống ở đây](${data.image})`)
                .setImage(data.image)
                
                return interaction.followUp({embeds: [imageEmbed]})
        };
        if(type === 'redpanda') {
            const url = await fetch(`https://some-random-api.ml/animal/red_panda`)
            const data = await url.json()
                //không trả về thì gửi về embed lỗi
                const noData = new MessageEmbed()
                .setColor('RED')
                .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh!`)
                if(!data) return interaction.followUp({embeds : [noData]})

                const res = await fetch(`https://api.popcat.xyz/translate?to=vi&text=${data.fact}`)
                const data1 = await res.json()

                //nếu có thì trả về ảnh
                const imageEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setURL(data.url)
                .setDescription(`**Tiêu đề:** ${data1.translated}\n [Tải xuống ở đây](${data.image})`)
                .setImage(data.image)
                
                return interaction.followUp({embeds: [imageEmbed]})
        };
        if (type === 'food') {
            const rd = Math.floor(Math.random() * 14000)
            const url = encodeURI(`https://api.tumblr.com/v2/blog/daily-deliciousness/posts/photo?api_key=${api_key}&limit=1&offset=${rd}`)
            await fetch(url)
            .then (res => res.json())
            .then(json => {
                const noData = new MessageEmbed()
                .setColor('RED')
                .setDescription(`Không tìm thấy hình ảnh, vui lòng thử lại!`)
                if(!json) return interaction.followUp({embeds: [noData]})

                const DataEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setTimestamp()
                .setDescription(`${json.response.posts[0].summary}`)
                .setImage(`${json.response.posts[0].photos[0].original_size.url}`)

                return interaction.followUp({embeds: [DataEmbed]})
            })
        };
        if(type === 'setup') {
            const rd = Math.floor(Math.random() * 500)
            const url = encodeURI(`https://api.tumblr.com/v2/blog/designersworkspace.tumblr.com/posts/photo?api_key=${api_key}&limit=1&offset=${rd}`)
            await fetch(url)
            .then (res => res.json())
            .then(json => {
                const noData = new MessageEmbed()
                .setColor('RED')
                .setDescription(`Không tìm thấy hình ảnh, vui lòng thử lại!`)
                if(!json) return interaction.followUp({embeds: [noData]})

                const DataEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setTimestamp()
                .setDescription(`${json.response.posts[0].summary}`)
                .setImage(`${json.response.posts[0].photos[0].original_size.url}`)

                return interaction.followUp({embeds: [DataEmbed]})
            })
        };
        if(type === 'wallpaper') {
            const rd = Math.floor(Math.random() * 38924)
            const url = encodeURI(`https://api.tumblr.com/v2/blog/thewallpaperzone/posts/photo?api_key=${api_key}&limit=1&offset=${rd}`)
            await fetch(url)
            .then (res => res.json())
            .then(json => {
                const noData = new MessageEmbed()
                .setColor('RED')
                .setDescription(`Không tìm thấy hình ảnh, vui lòng thử lại!`)
                if(!json) return interaction.followUp({embeds: [noData]})

                const DataEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setTimestamp()
                .setDescription(`${json.response.posts[0].summary}`)
                .setImage(`${json.response.posts[0].photos[0].original_size.url}`)

                return interaction.followUp({embeds: [DataEmbed]})
            })
        };
        if(type === 'shiba') {
            const [url] = await fetch("https://shibe.online/api/shibes")
            .then((res) => res.json());

            const imageEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`[Tải xuống tải đây](${url})`)
            .setImage(url)
            
            return interaction.followUp({embeds: [imageEmbed]})
        };
        if(type === 'meme') {
            const url = await fetch(`https://api.popcat.xyz/meme`)
            const data = await url.json()
            .then(data=> {
                //không trả về thì gửi về embed lỗi
                const noData = new MessageEmbed()
                .setColor('RED')
                .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh!`)
                if(!data) return interaction.followUp({embeds : [noData]})

                //nếu có thì trả về ảnh
                const imageEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(data.title)
                .setDescription(`Link bài viết gốc: [url](${data.url})`)
                .addField(`Upvotes:`, `\`${data.upvotes}\``, true)
                .addField(`Comments:`, `\`${data.comments}\``, true)
                .setImage(data.image)
                
                return interaction.followUp({embeds: [imageEmbed]})
            })
        }
    }
}
