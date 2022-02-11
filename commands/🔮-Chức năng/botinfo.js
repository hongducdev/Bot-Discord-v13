const {MessageEmbed} = require('discord.js');
const moment = require('moment');
const { utc } = require('moment');
const { mem, cpu, os, drive } = require('node-os-utils');

module.exports = {
    name: 'botinfo',
    category: '🔮-Chức năng',
    aliases: ['bot'],
    utilisation: '{prefix}botinfo',
    usage: '%bot',
    descriptions: 'Hiển thị ra thông tin của bot',
    async run (client, message, args) {

    const { totalGb, usedGb, freeGb, usedPercentage, freePercentage } = await drive.info();
    const { totalMemMb, usedMemMb } = await mem.info();
    const d = moment.duration(message.client.uptime);
    const days = (d.days() == 1) ? `${d.days()} ngày` : `${d.days()} ngày`;
    const hours = (d.hours() == 1) ? `${d.hours()} giờ` : `${d.hours()} giờ`;
        
    const embed = new MessageEmbed()
    .setColor('GREEN')
    .setTitle(`Thông tin của ${client.user.username}`)
    .addField(`Hệ điều hành`, `${await os.oos()}`, true)
    .addField(`Core`, `${cpu.count()}`,true)
    .addField(`Tổng bộ nhớ`, `${totalGb} GB`,true)
    .addField(`Bộ nhớ sử dụng`, `${usedGb} GB(${usedPercentage}%)`, true)
    .addField(`Bộ nhớ còn trống`, `${freeGb} GB(${freePercentage}%)`,true)
    .addField(`CPU`, `${cpu.model()}`, true)
    .addField(`RAM`, `${totalMemMb} MB`, true)
    .addField(`RAM sử dụng`, `${usedMemMb} MB`, true)
    .addField(`Uptime`, `${days} và ${hours}`, true)

      message.reply({ embeds: [embed] });
    }
}
