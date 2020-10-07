const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
  
  if(!message.member.hasPermission("ADMINISTRATOR")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Yönetici)**`).then(message => message.delete(5000))
    return;
  }
  
   const ototag = db.fetch(`ototag_${message.guild.id}`)  
 if(!ototag) return message.reply(`Sanırım bu özellik zaten kapalıymış :slight_smile:`)
 
 
  message.reply(`Ototag **Başarıyla Kapatıldı.**`)
  
    db.delete(`ototag_${message.guild.id}`)  


  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["oto-tag-kapat","ototagkapat"], 
  kategori: "ototag",
  permLevel: 3
};

exports.help = {
  name: 'ototag-kapat',
  description: 'Ototagı kapatırsınız.', 
  usage: 'ototag-kapat'
};