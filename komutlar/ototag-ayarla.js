const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
  
  if(!message.member.hasPermission("ADMINISTRATOR")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Yönetici)**`).then(message => message.delete(5000))
    return;
  }
  
  let isimm = args.slice(0).join(' ');
  if(!isimm) return message.channel.send('Lütfen Tagı Belirtiniz.\n**Örnek Kullanım**`'+ `${pref}`+'ototag-ayarla ❆ | -uye-`')
  
   message.channel.send('Oto Tag Sistemi Ayarlanmıştır. Kapatmak İçin `'+ `${pref}`+'ototag-kapat`')
  
    db.set(`ototag_${message.guild.id}`, isimm)  


  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["oto-tag-ayarla","ototagayarla"], 
  kategori: "ototag",
  permLevel: 3
};

exports.help = {
  name: 'ototag-ayarla',
  description: 'Ototagı ayarlarsınız.', 
  usage: 'ototag-ayarla ❆ | -uye-'
};