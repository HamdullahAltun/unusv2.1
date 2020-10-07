const Discord = require('discord.js')
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwODMxNjcwNTUyMDA5MTEzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5ODEzMjY5fQ.-i0garIv6KgpSYQ7PLwbx1Km3yrecXxSjbRZG-DzEbg', client);
const cümle = require('../oyun/yazmaoyunu.json');
let aktif = [];

exports.run = async (client, message) => {
  dbl.hasVoted(message.author.id).then(voted => {
    if (voted){
  if (aktif.includes(message.channel.id)) {
    return message.reply('Zaten başlatılmış bir oyun var.')
  }

  aktif.push(message.channel.id);
const eeembed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('Yazma Oyunu')
.setDescription(`Oyun ${message.author} tarafından başlatıldı. Botun biraz sonra yazacağı cümleyi ilk yazan kazanır. `)
.setFooter(`Bu görevi tamamlamak için ${1} dakikan var!`)
  let oyundurumu = await message.channel.send(eeembed);
let asıl = Math.floor(Math.random() * Object.keys(cümle).length) + 1;
  const embed = new Discord.RichEmbed()
  .setDescription(cümle[asıl])
  let cümlemesaj = await message.channel.send(embed)
  const collector = message.channel.createMessageCollector(
 msg => msg.content === cümle[asıl],
    {
      time: 5 * 60 * 5000,
      maxMatches: 1
    }
  );

  collector.on('end', async (collection, reason) => {
    let color, result;
    if (reason === 'time') {
      color = ("RED");
      result = 'Oyun bitti. Maalesef, kimse zamanında yazmayı başaramadı.';
    }
    else {
      color = ("GREEN");
      result = `Oyun bitti. Kazanan ${collection.map(m => m.author)[0]}!`;
    }
const eembed = new Discord.RichEmbed()
.setColor("RANDOM")
.setTitle('Yazma Oyunu')
.setDescription(result)
    await message.channel.send(eembed).catch(e => {
      client.log.error(e);
    });
    oyundurumu.delete().catch(() => {});
 
    cümlemesaj.delete().catch(() => {});

    aktif = aktif.slice(aktif.indexOf(message.channel.id) + 1, 1);
  })
}else{
  const embed = new Discord.RichEmbed()
  .setColor("RED")
  .setThumbnail(message.author.avatarURL)
  .setDescription(`Bu komutu kullanmak için **Unus**'a oy vermelisiniz. [Oy vermek için tıklayın.](https://top.gg/bot/708316705520091136/vote)\n**Not:** Oy verdikten sonra hala komutu kullanamıyorsanız lütfen **2** dakika içinde tekrar deneyin.`)
  .setFooter(client.user.username, client.user.avatarURL)
  .setTimestamp()
  message.channel.send(embed)
  }
})
}

exports.conf = {
  aliases: ['hızlıyazankazanır',"yazmaoyunu"],
  enabled: true,
  permLevel: 0,
  guildOnly: false,
  kategori: "eğlence"
};

exports.help = {
  name: 'yazma-oyunu',
  description: 'Botun yazdığı cümleyi ilk yazan kazanır.',
  usage:'yazma-oyunu'
};