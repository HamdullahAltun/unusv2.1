const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => {
  let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
const embed = new Discord.RichEmbed()  
.setAuthor("Unus Bot Sayaç Sistemi", client.user.avatarURL)
.setColor('BLUE')
.setDescription(`Komut kullanmak yerine bütün ayarlarınızı Unus'un Web Paneli(https://unus.tk) Üzerinden yapabilirsiniz.`)
.addField("__Sayacı Ayarlamak__", '__**'+ `${pref}`+'sayaç-ayarla**__ 》 **Sayacı Ayarlar.**\n Örnek: `'+ `${pref}`+'sayaç-ayarla #sayaçkanalı **Sayı**` \n \n __**'+ `${pref}`+'sayaç-hg-msj**__》 **Sayaç Hoşgeldin Mesajını Ayarlar. __'+ `${pref}`+'Premium İçindir__**\n Örnek: `'+ `${pref}`+'sayaç-hg-msj -server-, Sunucumuza Hoş Geldin, -uye-! -hedefuye- Kişiye Ulaşabilmek İçin -kalanuye- Kişi Kaldı!, **-uyesayisi-** Kişiyiz.` \n \n __**'+ `${pref}`+'sayaç-bb-msj**__ 》 **Sayaç Bay Bay Mesajını Ayarlar. __'+ `${pref}`+'Premium İçindir__**\nÖrnek: `'+ `${pref}`+'sayaç-bb-msj -uyetag-, Sunucumuzdan Ayrıldı, -hedefuye- Kişiye Ulaşabilmek İçin -kalanuye- Kişi Kaldı. **-uyesayisi-** Kişiyiz.`\n\n__**'+ `${pref}`+'sayaç-kapat**__ 》 **Sayacı Kapatır.**')

  .addField('__**Kullanabileceğiniz Değişkenler**__',`
-uye- 》 Üyenin İsmini Yazar.
-uyetag- 》 Üyenin İsmiyle Tagını Yazar.
-server- 》 Server İsmini Yazar.
-uyesayisi- 》 Üye Sayısını Atar.
-botsayisi- 》 Bot Sayısını Atar.
-kanalsayisi- 》 Kanal Sayısını Atar.
-bolge- 》 Sunucu Bölgesinin İsmini Atar.
-kalanuye- 》 Hedefe Kaç Kişi Kalmış Gösterir.
-hedefuye- 》 Hedef Rakamı Gösterir.
`)
     .setFooter('Unus Bot',client.user.avatarURL)
.setTimestamp()
 message.channel.send(embed) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['sayaçsistemi','sayac','sayacsistemi',"sayaç-sistemi"], 
  kategori: "sayaç",
  permLevel: 0
};

exports.help = {
  name: 'sayaç',
  description: 'Sayaç sistemi hakkında bilgi verir.', 
  usage: 'sayaç'
};
