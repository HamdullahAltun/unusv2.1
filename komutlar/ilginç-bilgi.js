const Discord = require('discord.js');
const sozler = require('../ilgincbilgi');
exports.run = (client, message, args) => {

    const ilgincsöz = sozler[Math.floor(Math.random() * sozler.length)]
    const ilgincsözembed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`İlginç Bir Bilgi`, message.author.avatarURL)
    .setThumbnail("https://cdn.discordapp.com/attachments/708340652793921646/713051315944554586/ilginceditlendi.png")
    .setFooter(`${message.author.username} bir ilginç bilgi öğrendi.`)
  .setDescription(`${ilgincsöz}`)
  .setTimestamp()
    return message.channel.send(ilgincsözembed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ib","ilgincbilgi","ilginçbilgi"],
  kategori: "eğlence",
  permLevel: 0
};

exports.help = {
  name: 'ilginç-bilgi',
  description: 'Bilmediginiz bir ilginç bilgi verir.',
  usage: 'ilginç-bilgi'
}