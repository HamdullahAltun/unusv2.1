const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 

    if(!message.member.hasPermission("MANAGE_MESSAGES")){
  message.delete()
  message.channel.send(`Yeterli yetkiniz yok! **(Mesajları Yönet)**`).then(message => message.delete(5000))
  return;
}
  
  if (!db.fetch(`snipesistemi_${message.guild.id}`)) {
  return message.reply(`Sanırım bu özellik zaten kapalıymış :slight_smile:`)
}
  db.delete(`snipesistemi_${message.guild.id}`)
  message.reply(`Snipe Sistemi **başarıyla kapatıldı.**`)
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["snipekapat","snipesistemikapat","snipe-sistemi-kapat"], 
  kategori:"sunucu",
  permLevel: "Mesajları Yönet"
};

exports.help = {
  name: 'snipe-kapat',
  description: 'Snipe sistemini(son silinen mesajı gösterir) kapatır.', 
  usage: 'snipe-kapat'
};
