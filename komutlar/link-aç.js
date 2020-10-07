const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  if(!message.member.hasPermission("MANAGE_CHANNELS")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Kanalları Yönet)**`).then(message => message.delete(5000))
    return;
  }
  if (db.fetch(`linkK_${message.channel.id}`)) {
  return message.reply(`Sanırım bu özellik zaten açıkmış :slight_smile:`)
}
  db.set(`linkK_${message.channel.id}`, message.channel.id)
  message.reply(`**Link Engeli** sadece bu kanal için **başarıyla açıldı.**`)
};

exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["link-engel-aç","linkengelaç","linkengeliaç","linkaç"], 
  kategori:"moderasyon",
  permLevel: "Kanalları Yönet"
};

exports.help = {
  name: 'link-aç',
  description: 'Yazdığınız kanaldaki link engelini açar.', 
  usage: 'link-aç'
};
