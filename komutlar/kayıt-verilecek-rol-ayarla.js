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
 
 if(!rol) return message.channel.send(`Kayıt Tamamlandığı Zaman Verilecek Rolü Ayarlamak İçin Bir Rol Etiketlemelisiniz Örnek: \`${pref}kayıt-verilecek-rol-ayarla @üyeler\``)
 
  message.channel.send(`Kayıt olan kullanıcılara verilecek otomatik rol **${rol}** olarak ayarlandı.`)

 
  db.set(`kayitVR_${message.guild.id}`, rol.id)  
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["kayıtverilecekrolayarla"], 
  kategori: "kayıt",
  permLevel: 3
};

exports.help = {
  name: 'kayıt-verilecek-rol-ayarla',
  description: 'Kayıt olunduktan sonra verilecek rolü ayarlarsınız.', 
  usage: 'kayıt-verilecek-rol-ayarla @rol'
};
