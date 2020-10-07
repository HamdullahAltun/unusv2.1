const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 

  if(!message.member.hasPermission("ADMINISTRATOR")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Yönetici)**`).then(message => message.delete(5000))
    return;
  }
 const kanal = db.fetch(`sayacK_${message.guild.id}`)  
 if(!kanal) return message.reply(`Sanırım bu özellik zaten kapalıymış :slight_smile:`)
 
 
  message.reply(`Sayaç **başarıyla kapatıldı.**`)

 
  db.delete(`sayacK_${message.guild.id}`)  
  db.delete(`sayacS_${message.guild.id}`) 
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["sayaçkapat","sayaçsıfırla","sayaç-sıfırla","sayaçsistemikapat"], 
  kategori: "sayaç",
  permLevel: 3
};

exports.help = {
  name: 'sayaç-kapat',
  description: 'Sayaç sistemini kapatır.', 
  usage: 'sayaç-kapat'
};
