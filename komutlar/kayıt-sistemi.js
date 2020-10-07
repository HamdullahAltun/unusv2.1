const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
   let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
  
const embed = new Discord.RichEmbed()  
.setAuthor("Unus Bot Kayıt Sistemi", client.user.avatarURL)
.setColor('BLUE')
.setDescription(`Komut kullanmak yerine bütün ayarlarınızı Unus'un Web Paneli(https://unus.tk) Üzerinden yapabilirsiniz.`)
.addField(`• \`${pref}kayıt-kanal-ayarla #kanal\`》`, "Üyelerin Kayıt Olacağı Kanal")
.addField(`• \`${pref}kayıt-log-ayarla #kanal\`》`, "Üyeler Kayıt Olunca Bildirim Yollanan Kanal")
.addField(`• \`${pref}kayıt-isim-sistemi -uye- -yas-\`》`, `
Üye İsim Sistemi Özgürce Yerleştirin
Yaş Seçeneği Eklemezseniz Yaşı İstemeyecektir.
`)
.addField(`• \`${pref}kayıt-verilecek-rol-ayarla @rol\`》`, "Kayıt Olan Kullanıcıya Otomatik Verilecek Rol")
.addField(`• \`${pref}kayıt-alınacak-rol-ayarla @rol\`》`, "Kayıt Olan Kullanıcıdan Otomatik Alınacak (Silinecek) Rol")
.addField(`• \`${pref}kayıt-sistemi-kapat\`》`, "Kayıt Sistemini Kapatır Ve Tüm Ayarları Sıfırlar.")
.addField(`• \`${pref}kayıt-giriş-mesajı Hoşgeldin -uye- Kayıt Olmak İçin ${pref}kayı-tol Ahmet 19\`》`, "Giriş Mesajını Özgürce Editleyebilirsiniz.")
  .addField('__**Kullanabileceğiniz Değişkenler**__',`
-uye- 》 Üyenin İsmini Yazar.
-yas- 》 Üyenin Yaşını Yazar.
`)
.setTimestamp()
.setFooter('Unus Bot',client.user.avatarURL)

 message.channel.send(embed) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["kayıtsistemi","kayıtbilgi"], 
  kategori: "kayıt",
  permLevel: 0
};

exports.help = {
  name: 'kayıt-sistemi',
  description: 'Kayıt sistemi hakkında bilgi verir.', 
  usage: 'kayıt-sistemi'
};
