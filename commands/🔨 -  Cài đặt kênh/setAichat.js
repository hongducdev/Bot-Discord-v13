const { MessageEmbed } = require('discord.js');
// const db = require('quick.db');
const aiModel = require('../../Model/aiModel');

module.exports = {
    name: 'setaichat',
    aliases: ['setai'],
    descriptions: 'Chọn một kênh ai chat',
    category: '🔨 -  Cài đặt kênh',
    usage: '<channel>',
    run: async (client, message, args) => {
        let perm = message.member.permissions.has('ADMINISTRATOR');

        if(!perm) {
            return message.reply({embeds: [
                new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('❌ Bạn không có quyền thực hiện lệnh này!')
            ]})
        }

        let cArgs = args[0];
        if(!cArgs) {
            return message.reply({embeds: [
                new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('❌ Bạn chưa nhập ID kênh để thiết lập!')
            ]})
        }

        if(isNaN(cArgs)) {
            return message.reply({embeds: [
                new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('❌ Bạn nhập một giá trị không đúng để thiết lập!')
            ]})
        }

        try {
            new aiModel({
                guildId: message.guild.id,
                channelId: cArgs
            }).save();
            message.reply({embeds: [
                new MessageEmbed()
                .setColor('GREEN')
                .setTitle("✅ Bạn đã thiết lập thành công kênh AI Chat: <#" + cArgs + ">")
            ]})
        } catch(err) {
            console.log(err);
            return message.reply({embeds: [
                new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('❌ Đã có lỗi xảy ra!')
            ]})
        }
    }
}
