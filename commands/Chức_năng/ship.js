const Discord = require("discord.js");
module.exports = {
  name: "ship",
  category: 'Chức_năng',
  usage: [],
  usage: '%ship [ID/ tag người cần ship]',
  descriptions: 'Hiển thị mức độ thành công với crush',

  async run(client, message, args) {
    let ship = Math.floor(Math.random() * 100) + 1;

    var cmt = '**Hơi khó khăn nhỉ😥**';
        if (ship >= 25) cmt = "**Hình như vẫn có hy vọng đó 🥲**";
        if (ship >= 50) cmt = "**Cũng khét đầy chứ đùa đâu 🤗**";
        if (ship >= 75) cmt = "**Tầm này thì hết nước chấm luôn rồi 😘**";
        if (ship >= 90) cmt = "**Cập bến luôn rồi 🥳**";

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (user.id == message.author.id)
      return message.channel.send({ content: `Bạn yêu bản thân mình nhiều hơn là đủ.` });
    let robber = message.author;

    if (!user) {
      return message.channel.send({
        content:
          "Hãy chắc chắn rằng bạn chọn một người mà bạn muốn đầy thuyền!"
      });
    }

    let embed = new Discord.MessageEmbed()
      .setAuthor('Cùng Bao-Chan Bot đẩy thuyền nào', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
      .setTimestamp(Date.now())
      .setTitle("Hmmmm ai sẽ là người được ship hôm nay nhỉ?")
      .setDescription(
        `\`${(await message.client.users.fetch(robber.id)).tag}\` & \`${(await message.client.users.fetch(user.id)).tag}\` tỷ lệ là... **${ship}%** \n Fact: ${cmt}`
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setColor(`GREEN`);
    let m = await message.channel.send({embeds: [embed]});
  },
};