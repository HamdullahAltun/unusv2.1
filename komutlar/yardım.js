const Discord = require('discord.js');
const db = require('quick.db');

exports.run = (client, message) => {
  
let pref = db.fetch(`prefix.${message.guild.id}`) || "*"
  message.react("✅")
    return message.author.send(`**${message.guild.name}** Adlı Sunucuda Prefixim: **${pref}**\n**Botu Daha Kolay Yönetebilmek** veya **Komutlara Bakmak** İçin: **https://unus.tk**\n**Bug Bildirmek** veya **Hata Çözümü** İçin Destek Sunucumuz: https://discord.gg/E4Q2HsB`)
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["y","h","help","yardımet"],
  kategori: "bot",
  permLevel: 0
};

module.exports.help = {
  name: 'yardım',
  description: 'Yardımcı Olur',
  usage: 'yardım'
};