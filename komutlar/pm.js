const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let guild = message.guild;
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first() || message.guild.members.get(args[0]);
  if (reason.length < 1) return message.reply('Ne Göndericem Ab.');
  if (message.mentions.users.size < 1) return message.reply('Kime Mesaj Atcam Ab.').catch(console.error);
  message.delete();
  message.reply('Mesajını Gönderdim Abi').then(message => message.delete(5000)); 
  return user.send(reason);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['öm',"özelmesajat"],
  kategori:"yapımcı",
  permLevel: 4
};

exports.help = {
  name: 'pm',
  description: 'Bir kullanıcıya özelden mesaj yollar.',
  usage: 'pm'
};