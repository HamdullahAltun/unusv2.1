const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => { 
const eksisozluk = require("eksisozlukjs");
eksisozluk.getEntry(args[0],function(result){
    //console.log("author: " + result[0].author);
    //=> ssg
 const vein = new Discord.RichEmbed()
 .setColor("GREEN")
 .setThumbnail("https://cdn.webrazzi.com/uploads/2019/12/eksi-sozluk-957.jpeg")
 .setTitle("Ekşi Sözlük")
 .setDescription(`**${args[0]}** İle İlgili İlk Sonuç`)
  .addField("Yazar",result[0].author)
 .addField("Entry",result[0].text)
 .setFooter(message.author.tag,message.author.avatarURL)
    message.channel.send(vein)
})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ekşi','eksi',"ekşisözlük"],
  kategori: "eğlence",
  permLevel: 0
};

exports.help = {
  name: 'ekşi-sözlük',
  description: 'Belirttiğiniz kelimeyi ekşi sözlükte aratır.',
  usage: 'ekşi-sözlük araba'
};