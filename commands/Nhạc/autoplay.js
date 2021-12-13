module.exports = {
    name: "autoplay",
    aliases: ["ap", "auto"],
    description: "Toggle the bot to continuously queue up recommended songs.",
    category: "music",
    execute(client, message) {
      const player = client.manager.get(message.guild.id);
  
      if (!player)
        meessage.reply(message, "The bot is currently not playing.");
  
      if (!client.canModifyQueue(message)) return;
  
      player.set("autoplay", !player.get("autoplay"));
  
      return bot.say.QueueMessage(bot, player, `Turned \`${player.get("autoplay") ? "on" : "off"}\` autoplay mode.`);
    }
  };