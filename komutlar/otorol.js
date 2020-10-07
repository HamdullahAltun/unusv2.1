const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
  
const embed = new Discord.RichEmbed()  
.setAuthor("Unus Bot Otorol Sistemi", client.user.avatarURL)
.setColor('BLUE')
.setDescription(`Komut kullanmak yerine bütün ayarlarınızı Unus'un Web Paneli(https://unus.tk) Üzerinden yapabilirsiniz.`)
.addField("__Otorolü Ayarlama__", '__**'+ `${pref}`+'otorol-ayarla**__ 》 **Otorolü Ayarlar.**\n Örnek: `'+ `${pref}`+'otorol-ayarla @rolünüz #logkanalı` \n \n __**'+ `${pref}`+'otorol-msj**__》 **Otorol Mesajını Ayarlar. __'+ `${pref}`+'Premium İçindir__**\n Örnek: `'+ `${pref}`+'otorol-msj -server-, Sunucumuza Hoşgeldin, -uye-! -rol- Adlı Rolün Başarı İle Verildi Seninle Beraber, **-uyesayisi-** Kişiyiz`' + '__**'+ `${pref}`+'otorol-kapat**__ 》 **Otorolü Kapatır.**')

  .addField('__**Kullanabileceğiniz Değişkenler**__',`
-uye- 》 Üyenin İsmini Yazar.
-rol- 》 Rolün İsmini Ekler.
-server- 》 Server İsmini Yazar.
-uyesayisi- 》 Üye Sayısını Atar.
-botsayisi- 》 Bot Sayısını Atar.
-kanalsayisi- 》 Kanal Sayısını Atar.
-bolge- 》 Sunucu Bölgesinin İsmini Atar.
-kalanuye- 》 Sayaç Hedefe Kaç Kişi Kalmış Gösterir.
-hedefuye- 》 Sayaç Hedef Rakamı Gösterir.
`)
     .setFooter('Unus Bot',client.user.avatarURL)
.setTimestamp()
 message.channel.send(embed) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['oto-rol',"otomatikrol"],
  kategori: "otorol",
  permLevel: 0
};

exports.help = {
  name: 'otorol',
  description: 'Otorol sistemi hakkında bilgi verir.', 
  usage: 'otorol'
};
