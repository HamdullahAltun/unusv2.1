const Discord = require('discord.js');
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwODMxNjcwNTUyMDA5MTEzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5ODEzMjY5fQ.-i0garIv6KgpSYQ7PLwbx1Km3yrecXxSjbRZG-DzEbg', client);

exports.run = (client, message, args) => { 
  dbl.hasVoted(message.author.id).then(voted => {
    if (voted){  
  const embed = new Discord.RichEmbed()
  .setColor('GREEN')
      .setThumbnail(message.author.avatarURL)
  .setDescription(`<@${message.member.id}>, Teşekkürler ama daha önce **Unus'**a oy vermişsiniz. Tekrar oy vermek için lütfen **12 saat** içinde tekrar deneyin.`)
    .setFooter(client.user.username, client.user.avatarURL)
    .setTimestamp()
	message.channel.send(embed)
  }
    else{
      const embed2 = new Discord.RichEmbed()
    .setColor("BLUE")
    .setThumbnail(message.author.avatarURL)
    .setDescription(`**Unus**'a oy verip destekleyeceğiniz için teşekkürler. [Oy vermek için tıklayın.](https://unus.tk/vote)`)
    .setFooter(client.user.username, client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed2)
    }
})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oyver","oy","botaoyver","vote","votever"],
  permLevel: 0,
  kategori: "bot"
};

exports.help = {
  name: 'oy-ver',
  description: 'Bota oy vererek gelişmesine destek olursunuz.',
  usage: 'oy-ver'
};