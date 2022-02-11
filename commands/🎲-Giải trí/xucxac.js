const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'xucxac',
    category: '🎲-Giải trí',
    aliases: ['xx'],
    utilisation: '{prefix}xucxac',
    usage: '%xucxac [số từ 1 đến 6]',
    descriptions: 'Chơi xúc xắc với Bao Chan Bot',
    run (client, message, args) {
        let number = [1, 2, 3, 4, 5, 6];
        
        let rollNumber = Math.floor(Math.random() * 6) + 1;

            let ket_qua = 'Trùng';
            if (!args[0] || args[0].match(/1|2|3|4|5|6/gi)) {
                if (rollNumber == args[0]) {
                    ket_qua = 'Trùng'
                } else {
                    ket_qua = 'Sịt'
                }
            }

            const embed = new MessageEmbed();

            // console.log(ket_qua);
            let noti;
            if (ket_qua == 'Trùng') {
                noti = 'Trùng';
                embed.addField(`**Fact:**`, `**Khó thế cũng làm được à khá đấy!**`);
                embed.setColor('GREEN')
            } else {
                noti = 'Không trùng';
                embed.addField(`**Fact:**`, `**Bỏ đi mà làm người chơi thế này là chết rồi!**`);
                embed.setColor('RED')
            }

            embed.setAuthor('Chơi Xúc Xắc với Bao-Chan Bot', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            embed.addField(`**Bạn chọn:**`, `\`${args[0]}\``, true)
            embed.addField(`**Bao-Chan Bot chọn:**`, `\`${rollNumber}\``, true)
            embed.addField(`**Kết quả:**`, `\`${noti}\``, true)
            embed.setTimestamp()
            embed.setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))

        message.reply({embeds : [embed]})
        
    }
}