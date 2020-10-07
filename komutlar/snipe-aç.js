const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 

    if(!message.member.hasPermission("MANAGE_MESSAGES")){
  message.delete()
  message.channel.send(`Yeterli yetkiniz yok! **(Mesajları Yönet)**`).then(message => message.delete(5000))
  return;
}
  
  if (db.fetch(`snipesistemi_${message.guild.id}`)) {
  return message.reply(`Sanırım bu özellik zaten açıkmış :slight_smile:`)
}
  db.set(`snipesistemi_${message.guild.id}`, "aktif")
  message.reply(`Snipe Sistemi **başarıyla açıldı.**`)
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["snipeaç","snipesistemiaç","snipe-sistemi-aç"], 
  kategori:"sunucu",
  permLevel: "Mesajları Yönet"
};

exports.help = {
  name: 'snipe-aç',
  description: 'Snipe sistemini(son silinen mesajı gösterir) aktifleştirir.', 
  usage: 'snipe-aç'
};
