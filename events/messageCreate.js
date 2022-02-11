const client = require("../index");
const fetch = require("node-fetch");
const axios = require('axios');
const { MessageEmbed, WebhookClient } = require('discord.js');

client.on("messageCreate", async (message) => {
//     const res = await axios.get('https://discord-phishing-backend.herokuapp.com/all');
//     const array = res.data;
//     if (array.some(word => message.content.toLowerCase().includes(word))) {
//         console.log(message.content.toLowerCase());
//         message.delete()
//         console.log(message.author.id)
//         const embedUser = new MessageEmbed()
//             .setTitle('Thông báo từ hệ thống')
//             .setDescription(`Chúng tôi nghi ngờ bạn đã gửi link scam`)
//             .addField(`Thông tin người gửi:`, `${message.author.id}`, true)
//             .addField(`Tại server:`, `${message.guild.id}(${message.guild.name})`, true)
//             .addField(`Tại channel:`, `${message.channel.id}`, true)
//             .addField(`Id tin nhắn:`, `${message.id}`, true)
//             .addField(`Thời gian:`, `<t:${parseInt(message.createdAt /1000)}:F>`, true)
//             .addField(`Nội dung tin nhắn:`, `\`\`\`diff\n${message.content}\`\`\``, false)
//             .setColor('#ff0000')
//         message.author.send({ embeds: [embedUser] });

//         const member = message.guild.members.cache.get(message.author.id);
//         // console.log(member)
//         member.ban({ reason: 'Gửi link scam' });
//         const embed = new MessageEmbed()
//             .setTitle("Cảnh báo link scam") 
//             .setColor("#ff0000")
//             .setDescription(`Hình như bạn ${message.author} đã gửi link scam`) 
//             .addField(` Nội dung tin nhắn:`, `\`\`\`diff\n${message.content}\`\`\``, false)
            
//         message.channel.send({ embeds: [embed] }).then(m => { setTimeout(() => { m.delete() }, 10000) })
//         new WebhookClient({ url: "https://discord.com/api/webhooks/938802848433582191/3e1nP34LyGNxioFstFfDlCOQQ84hgo6-3tztDBa1pzS3ELhVgFJTfRsS7jGeyew4y7sx"})
//         .send({ embeds: [
//             new MessageEmbed()
//             .setTitle("Cảnh báo link scam")
//             .setColor("#ff0000")
//             .setDescription(`Hình như bạn ${message.author} đã gửi link scam`)
//             .addField(`Thông tin người gửi:`, `${message.author.id}`, true)
//             .addField(`Tại server:`, `${message.guild.id}(${message.guild.name})`, true)
//             .addField(`Tại channel:`, `${message.channel.id}`, true)
//             .addField(`Id tin nhắn:`, `${message.id}`, true)
//             .addField(`Thời gian:`, `<t:${parseInt(message.createdAt /1000)}:F>`, true)
//             .addField(`Nội dung tin nhắn:`, `\`\`\`diff\n${message.content}\`\`\``, false)
//         ]})
//     }
            
    if(message.content == `${client.user.id}`) {
        message.reply({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setDescription(`Prefix:  \`${client.config.prefix}\`  hoặc sử dụng slash!`)
        ]})
    }
            
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});
