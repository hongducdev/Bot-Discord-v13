const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'buakeobao',
    category: '🎲-Giải trí',
    aliases: ['bkb', 'oantuti', 'ott'],
    utilisation: '{prefix}buakeobao',
    usage: '%buakeobao [bua/keo/bao]',
    descriptions: 'Chơi búa kéo bao với Bot',
    run (client, message, args, interaction) {
        // const member = message.mentions.members.first()|| message.guild.members.cache.get(args[0]) || message.member
        let choices = ['búa', 'kéo', 'bao']

        let botsChoice = choices[~~(Math.random() * choices.length)];

        let ket_qua = 'Hòa';
        if (!args[0] || args[0].match(/búa|kéo|bao|bua|keo/gi)) {
            if (botsChoice == 'búa' && args[0] == 'bao') {
                ket_qua = 'Bạn';
            } else if (botsChoice == 'búa' && args[0] == 'kéo' || args[0] == 'keo') {
                ket_qua = 'Bao-Chan Bot';
            } else if (botsChoice == 'búa' && args[0] == 'búa' || args[0] == 'bua') {
                ket_qua = 'Hòa';
            }

            if (botsChoice == 'kéo' && args[0] == 'bao') {
                ket_qua = 'Bao-Chan Bot';
            } else if (botsChoice == 'kéo' && args[0] == 'búa' || args[0] == 'bua') {
                ket_qua = 'Bạn';
            } else if (botsChoice == 'kéo' && args[0] == 'kéo' || args[0] == 'keo') {
                ket_qua = 'Hòa';
            }

            if (botsChoice == 'bao' && args[0] == 'búa' || args[0] == 'bua') {
                ket_qua = 'Bao-Chan Bot';
            } else if (botsChoice == 'bao' && args[0] == 'kéo' || args[0] == 'keo') {
                ket_qua = 'Bạn';
            } else if (botsChoice == 'bao' && args[0] == 'bao') {
                ket_qua = 'Hòa';
            }
        }

        // console.log(ket_qua);
        let noti;
        if (ket_qua == 'Hòa') {
            noti = 'Hòa'
        } else {
            noti = `${ket_qua} dành chiến thắng.`
        }

        const embed = new MessageEmbed();

        let color;
        if (ket_qua == 'Hòa') {
            embed.setColor('YELLOW') 
            embed.addField(`**Fact:**`,`**Cũng khét đấy con gà này!**`);
        } else if (ket_qua == 'Bao-Chan Bot') {
            embed.setColor('RED')
            embed.addField(`**Fact:**`,`**Thua cả con Bot đúng con gà!**`);
        } else if (ket_qua == 'Bạn'){
            embed.setColor('GREEN')
            embed.addField(`**Fact:**`,`**Lần này chấp thôi nhá con gà!**`);
        }

        embed.setAuthor('Chơi Búa/Kéo/Bao với Bao-Chan Bot', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        embed.addField(`**Bạn chọn:**`, `\`${args[0]}\``, true)
        embed.addField(`**Bao-Chan Bot chọn:**`, `\`${botsChoice}\``, true)
        embed.addField(`**Kết quả:**`, `\`${noti}\``, true)
        embed.setTimestamp()
        embed.setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))

        message.reply({embeds : [embed]})
    }
}