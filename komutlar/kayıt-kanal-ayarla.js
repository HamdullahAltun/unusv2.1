const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
    let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
  
let kanal = message.mentions.channels.first()
if(!message.member.hasPermission("ADMINISTRATOR")){
  message.delete()
  message.channel.send(`Yeterli yetkiniz yok! **(Yönetici)**`).then(message => message.delete(5000))
  return;
}
  
 if(!kanal) return message.channel.send(`
 Lütfen bir kanal etiketleyiniz. Örnek: ${pref}kayıt-kanal-ayarla \`#kayıtkanal\``)
 
  message.channel.send(`Kayıt kanalı **${kanal}** olarak ayarlandı.`)
  db.set(`kayitKanal_${message.guild.id}`, kanal.id) 
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["kayıtkanalayarla","kayıtkanalınıayarla"], 
  kategori: "kayıt",
  permLevel: 3
};

exports.help = {
  name: 'kayıt-kanal-ayarla',
  description: 'Kayıt kanalını ayarlarsınız.', 
  usage: 'kayıt-kanal-ayarla #kayıtkanal'
};
