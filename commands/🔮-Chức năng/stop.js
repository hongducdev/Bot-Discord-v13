const { MessageEmbed } = require('discord.js');
const voice = require('@discordjs/voice')

module.exports = {
    name: 'stop',
    category: '🔮-Chức năng',
    aliases: ['leave'],
    descriptions: 'Ngắt kết nối bot trong phòng thoại!',
    utilisation: '{prefix}stop',
    run: async(client, message, args) => {
        const connection = voice.joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        })
        if(!connection) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setDescription('Bot không ở trong phòng nào!')
        ]})
        const stopEmbed = new MessageEmbed()
            .setColor ('RED')
            .setTitle(`Đã ngắt kết nối...`)
            .setDescription(`**Bao-Chan Bot đi đây gặp lại sau!**`)
        await connection.destroy(true);
        await message.reply({ embeds: [stopEmbed]});
    }
}
