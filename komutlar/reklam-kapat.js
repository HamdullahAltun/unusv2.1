const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_CHANNELS")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Kanalları Yönet)**`).then(message => message.delete(5000))
    return;
  }
  if (!db.fetch(`reklamK_${message.channel.id}`)) {
  return message.reply(`Sanırım bu özellik zaten kapalıymış :slight_smile:`)
}
  db.delete(`reklamK_${message.channel.id}`)
  message.reply(`Reklam Engeli **sadece bu kanalda** devre dışı bırakıldı.`)
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["reklamengelkapat","reklamengelikapat","reklamkapat"], 
  kategori:"moderasyon",
  permLevel: "Kanalları Yönet"
};

exports.help = {
  name: 'reklam-kapat',
  description: 'Yazdığınız kanaldaki reklam engelini kapatır.', 
  usage: 'reklam-kapat'
};
