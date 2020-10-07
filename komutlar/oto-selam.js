const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Sunucuyu Yönet)**`).then(message => message.delete(5000))
    return;
  }
let otoselam = db.fetch(`otoselam_${message.guild.id}`)
if(!otoselam) {
message.channel.send(`Oto-selam sistemi başarıyla açıldı.`)
db.set(`otoselam_${message.guild.id}`, true)
} else {
message.channel.send(`Oto-selam sistemi başarıyla kapatıldı.`)
db.delete(`otoselam_${message.guild.id}`)
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sa-as',"saas","otoselam"],
  kategori:"sunucu", 
  permLevel: "Sunucuyu Yönet"
};

exports.help = {
  name: 'oto-selam',
  description: 'Selam Verenlere Otomatikmen Cevap Verir.',
  usage: 'oto-selam'
};