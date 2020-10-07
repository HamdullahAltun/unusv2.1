const Discord = require("discord.js")
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwODMxNjcwNTUyMDA5MTEzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5ODEzMjY5fQ.-i0garIv6KgpSYQ7PLwbx1Km3yrecXxSjbRZG-DzEbg', client);
const superagent = require('superagent')
const db = require('quick.db');

exports.run = (client, msg, args) => {
    let pref = (db.fetch(`prefix.${msg.guild.id}`)) || "*";
  dbl.hasVoted(msg.author.id).then(voted => {
    if (voted){
  if(!args[0]) return msg.channel.send(`Lütfen ir sunucu **IPsi** giriniz.\n**Not:** IP girerken sadece ipyi giriniz. Portu girmeyiniz. Örnek: ${pref}csgo-sunucu-gt 185.193.165.162`)
  if(args[0].length > 15) return msg.channel.send(`**IP** girerken sadece **IPyi** giriniz. Portu girmeyiniz. \n**Örnek:** ${pref}csgo-sunucu-gt 185.193.165.162`)
    const resim = (`https://cache.gametracker.com/server_info/${args[0]}:27015/b_560_95_1.png`)
    
      msg.channel.send({ file: resim })
    }else{
      const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setThumbnail(message.author.avatarURL)
      .setDescription(`Bu komutu kullanmak için **Unus**'a oy vermelisiniz. [Oy vermek için tıklayın.](https://top.gg/bot/708316705520091136/vote)\n**Not:** Oy verdikten sonra hala komutu kullanamıyorsanız lütfen **2** dakika içinde tekrar deneyin.`)
      .setFooter(client.user.username, client.user.avatarURL)
      .setTimestamp()
      msg.channel.send(embed)
      }
  })
  
  }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["csgogt","csgoservergt","csgt","csgosunucugt"],
  kategori: "kullanıcı",
  kategori: "kullanıcı",
  permLevel: 0
};

exports.help = {
  name: 'csgo-sunucu-gt',
  description: 'CS:GO Sunucunuzun GameTracker içindeki sıralamasını gösterir.',
  usage: 'csgo-sunucu-gt 185.193.165.162'
};