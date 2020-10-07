const Discord = require("discord.js");
const db = require("quick.db")
exports.run = async (client, message, args) => {
  if (!args[0]) {
    return message.channel.send("Lütfen bir id yazın!")
  }
  message.channel.send("IDsini girdiğiniz sunucu için premium **aktif edildi**!")
  return db.set(`premium_${args[0]}`, "aktif")
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["prever","premiumver"],
  kategori: "yapımcı",
  permLevel: 4
};

module.exports.help = {
  name: 'prever',
  description: 'preverir',
  usage: 'prever'
};
