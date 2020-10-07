const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.');
  message.delete();
  message.channel.send(mesaj);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yaz-bot',"botyaz"],
  kategori:"sunucu",
  permLevel: 3
};

exports.help = {
  name: 'yaz',
  description: 'Bota yazdırmak istediğiniz şeyi yazdırırsınız.',
  usage: 'yaz [yazdırmak istediğiniz şey]'
};
