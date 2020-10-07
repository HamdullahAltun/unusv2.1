const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 

    if(!message.member.hasPermission("MANAGE_CHANNELS")){
  message.delete()
  message.channel.send(`Yeterli yetkiniz yok! **(Kanalları Yönet)**`).then(message => message.delete(5000))
  return;
}
  
  if (db.fetch(`küfürE_${message.channel.id}`)) {
  return message.reply(`Sanırım bu özellik zaten açıkmış :slight_smile:`)
}
  db.set(`küfürE_${message.channel.id}`, "aktif")
  message.reply(`**Küfür Engeli** sadece bu kanal için **başarıyla açıldı.**`)
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["küfürüengeliaç","küfüraç","küfürengeliniaç"], 
  kategori:"moderasyon",
  permLevel: "Kanalları Yönet"
};

exports.help = {
  name: 'küfür-aç',
  description: 'Yazdığınız kanalda küfür engelini açar', 
  usage: 'küfür-aç'
};
