const { get } = require('snekfetch');
const Discord = require('discord.js');

exports.run = async (client, message) => {
  const espri = await get('https://api.emirkabal.com/espri').set('Authorization', '0nxfzl930fxhhynl0z1zwvod0fin4ink0e3jauqmuuxwno78lvefwc3a8n1affmy');
  if (!espri || !espri.body || !espri.body.mesaj) return console.log("Bir hata oluştu.");
  message.channel.send(espri.body.mesaj)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['espiri','espriyap'],
  kategori: "eğlence",
  permLevel: 0
};

exports.help = {
  name: 'espri',
  description: 'Espri yapar.',
  usage: 'espri'
};