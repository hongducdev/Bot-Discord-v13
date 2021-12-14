const {MessageEmbed} = require('discord.js');
const moment = require('moment');
const { utc } = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const { version } = require('../../package.json')

module.exports = {
    name: 'botinfo',
    category: 'Chức_năng',
    aliases: ['bot'],
    utilisation: '{prefix}avatar',
    async run (client, message, args) {

      let mcount = 0; 
      client.guilds.cache.forEach((guild) => {
          mcount += guild.memberCount 
      })

        const prefix = '%'
        const d = moment.duration(message.client.uptime);
        const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
        const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
        const clientStats = stripIndent`
          Servers    :: ${message.client.guilds.cache.size}
          Người dùng :: ${mcount}
          Số kênh    :: ${message.client.channels.cache.size}
          WS Ping    :: ${Math.round(message.client.ws.ping)}ms
          Uptime     :: ${days} and ${hours}
          Prefix     :: ${prefix}
       `;
        const { totalMemMb, usedMemMb } = await mem.info();
        const serverStats = stripIndent`
          OS         :: ${await os.oos()}
          Cores      :: ${cpu.count()}
          Model      :: ${cpu.model()}
          Host       :: ${os.hostname()}
          Type       :: ${os.type()}
          Platform   :: ${os.platform()}
          CPU Usage  :: ${await cpu.usage()} %
          RAM        :: ${totalMemMb} MB
          RAM Usage  :: ${usedMemMb} MB
        `;
    
        const embed = new MessageEmbed()
        .setAuthor('Thông tin Bao-Chan Bot', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .addField('Bot tag:', `\`${client.user.tag}\``,true)
        .addField('ID :', `\`${client.user.id}\``,true)
        .addField('Người lập trình:',`${(await message.client.users.fetch('769244837030526976'))}`,true)
        .addField('Ngày tạo bot',`\`${utc(client.user.createdTimestamp).format('MM/DD/YYYY HH:mm:ss')}\``,true)
        .addField('Phiên bản:', `\`${version}\``,true)
        .addField('Nodejs:', `\`${'16.8.0'}\``,true)
        .addField('Discord.js:', `\`${'13.2.0'}\``,true)
        .addField('Lệnh', `\`${message.client.commands.size}\` lệnh`, true)
        .addField('Bí danh', `\`${message.client.aliases.size}\` bí danh`, true)
        .addField('Client', `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .addField('Server', `\`\`\`asciidoc\n${serverStats}\`\`\``)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('GREEN');
        message.reply({ embeds: [embed] });
    }
}
