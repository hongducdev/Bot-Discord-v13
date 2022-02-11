const { MessageEmbed, CommandInteraction, Client } = require('discord.js')
const moment = require('moment')
const { utc } = require('moment');
const { mem, cpu, os, drive } = require('node-os-utils');

module.exports = {
  name: 'botinfo',
  description: 'Hiển thị thông tin của bot',
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  run: async(client, interaction, args) => {
    const { totalGb, usedGb, freeGb, usedPercentage, freePercentage } = await drive.info();
    const { totalMemMb, usedMemMb } = await mem.info();
    const d = moment.duration(interaction.client.uptime);
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
    .addField(`Uptime`, `${days} and ${hours}`, true)

    return interaction.followUp({embeds: [embed]})
  }
}
