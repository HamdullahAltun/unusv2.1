const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => {
  let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
const embed = new Discord.RichEmbed()  
.setAuthor("Unus Bot Otoag Sistemi", client.user.avatarURL)
.setColor('BLUE')
.setDescription(`Komut kullanmak yerine bütün ayarlarınızı Unus'un Web Paneli(https://unus.tk) Üzerinden yapabilirsiniz.`)
.addField("__Ototagı Ayarlamak__", '__**'+ `${pref}`+'ototag-ayarla**__ 》 **Verilecek Tagı Ayarlar.**\n Örnek: `'+ `${pref}`+'ototag-ayarla ❆ | -uye-` \n \n __**'+ `${pref}`+'ototag-kapat**__》 **Oto Tagı Kapatır.**')

  .addField('__**Kullanabileceğiniz Değişkenler**__',`
-uye- 》 Üyenin İsmini Yazar.
`)
     .setFooter('Unus Bot',client.user.avatarURL)
.setTimestamp()
 message.channel.send(embed) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['tagsistemi',"ototagsistemi","tag-sistemi","oto-tag-sistemi"], 
  kategori: "ototag",
  permLevel: 0
};

exports.help = {
  name: 'ototag',
  description: 'Ototag sistemi hakkında bilgi verir.', 
  usage: 'ototag'
};
