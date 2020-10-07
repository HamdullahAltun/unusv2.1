const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 

  if(!message.member.hasPermission("ADMINISTRATOR")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Yönetici)**`).then(message => message.delete(5000))
    return;
  }

 const rol = db.fetch(`kayitKanal_${message.guild.id}`)  
 if(!rol) return message.reply(`Sanırım bu özellik zaten kapalıymış :slight_smile:`)
 
 
  message.reply(`Kayıt Sistemi **Başarıyla Kapatıldı.** `)

 
  db.delete(`kayitAR_${message.guild.id}`)  
  db.delete(`kayitVR_${message.guild.id}`) 
  db.delete(`kayitLog_${message.guild.id}`)  
  db.delete(`kayitKanal_${message.guild.id}`)  
 /* db.delete(`isimtemizleyiciK_${message.guild.id}`) */ 
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["kayıtsistemikapat"], 
  kategori: "kayıt",
  permLevel: 3
};

exports.help = {
  name: 'kayıt-sistemi-kapat',
  description: 'Kayıt sistemini kapatır.', 
  usage: 'kayıt-sistemi-kapat'
};
