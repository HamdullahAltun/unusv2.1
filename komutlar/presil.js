const Discord = require("discord.js");
const db = require("quick.db")
exports.run = async (client, message, args) => {
  if (!args[0]) {
    return message.channel.send("Lütfen bir id yazın!")
  }
  message.channel.send("IDsini girdiğiniz sunucu için premium **kapatıldı**!")
  return db.delete(`premium_${args[0]}`)
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["presil","premiumsil"],
  kategori: "yapımcı",
  permLevel: 4
};

module.exports.help = {
  name: 'presil',
  description: 'presiler',
  usage: 'presil'
};
