const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
  
let rol = message.mentions.roles.first() 
let kanal = message.mentions.channels.first()
if(!message.member.hasPermission("ADMINISTRATOR")){
  message.delete()
  message.channel.send(`Yeterli yetkiniz yok! **(Yönetici)**`).then(message => message.delete(5000))
  return;
}
 
 if(!rol) return message.channel.send(`Kayıt Tamamlandığı Zaman Alınacak Rolü Ayarlamak İçin Bir Rol Etiketlemelisiniz Örnek: \`${pref}kayıt-alınacak-rol-ayarla @üyeler\``)
 
  message.channel.send(`Kayıt Olan Kullanıcılardan Alınacak Otomatik Rol **${rol}** Şeklinde Ayarlandı.`)

 
  db.set(`kayitAR_${message.guild.id}`, rol.id)  
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["kayıtalınacakrolayarla","kayıtsilinecekrolayarla"], 
  kategori: "kayıt", 
  permLevel: 3
};

exports.help = {
  name: 'kayıt-alınacak-rol-ayarla',
  description: 'Kayıt olunduktan sonra alınacak rolü ayarlarsınız.', 
  usage: 'kayıt-alınacak-rol-ayarla @rol'
};
