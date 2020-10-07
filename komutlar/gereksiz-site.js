const Discord = require('discord.js');
const sozler = require('../gereksizsiteler');
exports.run = (client, message, args) => {

    const ilgincsöz = sozler[Math.floor(Math.random() * sozler.length)]
    const ilgincsözembed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Değişik Siteler`, message.author.avatarURL)
    .setThumbnail("https://cdn.discordapp.com/attachments/708340652793921646/713053233924407437/sitee.png")
    .setFooter(`${message.author.username} için değişik bir site.`)
    .setURL(`${ilgincsöz}`)
    .setTitle(":link: Gitmek için tıkla!")
    .setTimestamp()
    return message.channel.send(ilgincsözembed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["değişiksiteler","değişiksite","gereksizsite"],
  kategori: "eğlence",
  permLevel: 0
};

exports.help = {
  name: 'değişik-site',
  description: 'Değişik siteler verir.',
  usage: 'değişik-site'
}