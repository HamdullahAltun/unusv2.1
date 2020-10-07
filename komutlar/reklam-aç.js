const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  if(!message.member.hasPermission("MANAGE_CHANNELS")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Kanalları Yönet)**`).then(message => message.delete(5000))
    return;
  }
  if (db.fetch(`reklamK_${message.channel.id}`)) {
  return message.reply(`Sanırım bu özellik zaten açıkmış :slight_smile:`)
}
  db.set(`reklamK_${message.channel.id}`, message.channel.id)
  message.reply(`**Reklam Engeli** sadece bu kanal için **başarıyla açıldı.**`)
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["reklamengelaç","reklamengeliaç","reklamaç"], 
  kategori:"moderasyon",
  permLevel: "Kanalları Yönet"
};

exports.help = {
  name: 'reklam-aç',
  description: 'Yazdığınız kanaldaki reklam engelini açar.', 
  usage: 'reklam-aç'
};
