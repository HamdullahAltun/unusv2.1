const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
let a = ayarlar.prefix
    let p = await db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix
 let o = await db.fetch(`prefix.${message.guild.id}`)
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.RichEmbed()
.setDescription(`Bu Komutu Kullanabilmek İçin Yönetici Yetkisine Sahip Olmalısınız. Şuan Ki Prefix: **${p}**`));
  
if(args[0] === "ayarla") {
if(o) { return message.channel.send(`Ayarlanmış Şeyi Tekrar Ayarlıyamazsınız. Şuan Ki Prefix: **${p}**. Sıfırlamak İçin: **${p}prefix sıfırla**`);
      }
if(!args[1]) return message.channel.send(`Lütfen Bir Prefix Giriniz. Şuan Ki Prefix: **${p}**`);
db.set(`prefix.${message.guild.id}`, args[1])
message.channel.send(`Prefix Başarıyla **${args[1]}** Olarak Ayarlandı.`);
}
    if(args[0] === "sıfırla") {
    if(!o) {
       return message.channel.send(`Ayarlanmayan Prefixi Sıfırlayamazsınız. Şuan Ki Prefix: **${p}**`);
    }
    db.delete(`prefix.${message.guild.id}`)
   return message.channel.send(`Prefix Başarıyla Sıfırlandı. Şuan Ki Prefix: **${a}**`);
  }
  
 if(!args[0]) return message.channel.send(`Prefix Ayarlamak İçin **${p}prefix ayarla <prefix>** / **Sıfırlamak İçin ${p}prefix sıfırla** \nŞuan Ki Prefix: **${p}**`);
  
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['p',"prefix","önek"],
  kategori: "sunucu", 
    permLevel: 3
};
  
  exports.help = {
    name: 'prefix',
    description: 'Botun sunucuya özel prefixini ayarlarsınız.',
    usage: 'prefix <yeni prefix> / prefix sıfırla'
};
