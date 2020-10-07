const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
   message.channel.send('Hemen Diyorum Abi 1 Saniye..').then(message => {
     const random = Math.floor(Math.random() * 60) + 1
            message.edit(`**Senin Malafatın ${random}CM** :eggplant:`);
 });
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kaçcm',"malafatölç"],
  permLevel: 0,
  kategori: "eğlence"
};

exports.help = {
  name: 'kaçcm',
  description: 'Malafatınızı öçler.',
  usage: 'kaçcm'
};