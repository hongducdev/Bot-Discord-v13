const {MessageEmbed} = require('discord.js');
const { stripIndent } = require('common-tags');

module.exports = {
    name: 'donate',
    category: 'Chức_năng',
    aliases: ['dnt', 'ungho'],
    utilisation: '{prefix}avatar',
    async run (client, message, args) {
        const donate = stripIndent`
          Viettinbank       :: ${'102872254585 NGUYEN HONG DUC'}
          VPBank(Cake)      :: ${'0916157704 NGUYEN HONG DUC'}
          Momo              :: ${'0916157704 NGUYEN HONG DUC'} 
        `;
            const avatarEmbed = new MessageEmbed()
                .setAuthor('Donate cho server Bao Chan', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
                .setColor ('GREEN')
                .setDescription(`Mình chỉ nhận qua duy nhất 1 stk: **167680224 VPBANK Tran Bao Khanh Momo: 0981306049**. Khi gửi các bạn vui lòng cap toàn màn hình biên lai cho mình nhé và gửi tại <#907824785852080178>. Cảm ơn mọi người đã ủng hộ server.`)
                // .addField(`**- Ủng hộ ${(await message.client.users.fetch('769244837030526976'))} để có tiền duy trì Bao Chan Bot: **`,`\`\`\`asciidoc\n${donate}\`\`\`)
                .addField(`Ủng hộ mình để có tiền duy trì Bao Chan Bot: `, `\`\`\`asciidoc\n${donate}\`\`\``)
                .setTimestamp()
                .setFooter(`Bot: Bao-Chan Bot by PinkDuwc._`, message.author.avatarURL({ dynamic: true }))
            message.channel.send({ embeds: [avatarEmbed] });
    }
}