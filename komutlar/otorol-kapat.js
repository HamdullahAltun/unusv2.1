const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 

  if(!message.member.hasPermission("ADMINISTRATOR")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Yönetici)**`).then(message => message.delete(5000))
    return;
  }

 const rol = db.fetch(`otoRL_${message.guild.id}`)  
 if(!rol) return message.reply(`Sanırım bu özellik zaten kapalıymış :slight_smile:`)
 
 
  message.reply(`Otorol **Başarıyla Kapatıldı.**`)

 
  db.delete(`otoRL_${message.guild.id}`)  
  db.delete(`otoRK_${message.guild.id}`) 
  db.delete(`otoRM_${message.guild.id}`)  
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["otorolkapat","oto-rol-kapat","oto-rolkapat"], 
  kategori: "otorol",
  permLevel: 3
};

exports.help = {
  name: 'otorol-kapat',
  description: 'Otorolü kapatırsınız.', 
  usage: 'otorol-kapat'
};
