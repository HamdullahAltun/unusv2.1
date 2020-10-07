const Discord = require("discord.js");
const Minesweeper = require('discord.js-minesweeper');

module.exports.run = async (bot, message, args) => {
  const rows = parseInt(args[0]);
  const columns = parseInt(args[1]);
  const mines = parseInt(args[2]);

  if (!rows) {
    return message.channel.send(':warning: Lütfen satır sayısını belirtin.');
  }

  if (!columns) {
    return message.channel.send(':warning: Lütfen sütun sayısını girin.');
  }

  if (!mines) {
    return message.channel.send(':warning: Lütfen mayın sayısını belirtiniz.');
  }

  const mayınoyun = new Minesweeper({ rows, columns, mines });
  const ss = mayınoyun.start();

  return ss
    ? message.channel.send(ss)
    : message.channel.send(':warning: Geçersiz veri.');
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['mayıntarlasıoyunu',"mineswepper","mayıntarlası"],
  kategori:"eğlence",
  permLevel: 0
}

exports.help = {
  name: 'mayın-tarlası',
  description: "Mayın tarlası oyununu oynarsınız",
  usage: 'mayın-tarlası 5 5 5'
}
