const Discord = require('discord.js');
const db = require("quick.db")
exports.run = function(client, message, args) {
     let moderasyonrol = db.fetch(`moderasyonrol_${message.guild.id}`)
     if(moderasyonrol){
if(!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.roles.has(moderasyonrol.id)){
  message.delete()
  message.channel.send(`Yeterli yetkiniz yok!`).then(message => message.delete(5000))
  return;
}}
  if(!moderasyonrol){
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
  message.delete()
  message.channel.send(`Yeterli yetkiniz yok!`).then(message => message.delete(5000))
  return;
}
}
  const m = args.join(' ');
  if(!m) return message.channel.send('**:gear: Bir miktar girmelisiniz!**');
  if(m < 2) return message.channel.send(':gear: **En az 2 mesaj silinebilir!**')
 if(m>100) return message.channel.send('**:gear: En fazla 100 mesaj silinebilir!**')
  message.delete();
  message.channel.bulkDelete(m);
  let silinenmesaj = message.channel.bulkDelete
  
  message.channel.send(`**${m}** tane mesaj silindi.`).then(msg => msg.delete(5000))
  };
   
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['temizle','clear','sil',"delete"],
  permLevel: "Mesajları Yönet veya Moderasyon Rol",
  kategori: "moderasyon"
};

exports.help = {
  name: 'temizle',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'temizle <silinicek mesaj sayısı>'
};