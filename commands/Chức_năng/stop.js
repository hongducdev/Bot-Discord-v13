const  { checkSameRoom, noMusicEmbed } = require('../../utils')
const { MessageEmbed } = require('discord.js');
const voice = require('@discordjs/voice')

module.exports = {
    name: 'stop',
    category: 'Chức_năng',
    aliases: ['leave'],
    description: 'Tắt nhạc',
    utilisation: '{prefix}stop',
    run: async(client, message, args) => {
        const connection = voice.joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        })
        const stopEmbed = new MessageEmbed()
            .setColor ('RED')
            .setTitle(`Đã ngắt kết nối...`)
            .setDescription(`**Bao-Chan Bot đi đây gặp lại sau!**`)
        if (checkSameRoom(message)) return;
        await connection.destroy();
        await message.reply({ embeds: [stopEmbed]});
    }
}
