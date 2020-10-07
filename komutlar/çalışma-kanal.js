const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Yönetici)**`).then(message => message.delete(5000))
    return;
  }
let x = []
let xx = ''
let kontrol = db.fetch(`çalışmakanal.${message.guild.id}`)
let kanal = message.mentions.users.first() || message.channel

if(args[0] && args[0].toLowerCase() == 'liste') {
if(!kontrol) return message.channel.send(`Unus bu sunucuda bütün kanallarda çalışıyor.`)
kontrol.forEach(a => { xx += `<#${a}> ` })
message.channel.send(`Bu sunucuda çalışılmayacak kanallar ${xx} olarak ayarlanmış.`)
}

else if(kontrol && kontrol.includes(kanal.id)) {
kontrol.forEach(a => { if(a == kanal.id) return; x.push(kanal.id); })
message.channel.send(`Unus artık ${kanal} **kanalında çalışacak**, çalışmaması için aynı komutu kullanınız.`)
db.set(`çalışmakanal.${message.guild.id}`, x)
return;
}

db.push(`çalışmakanal.${message.guild.id}`, kanal.id)
message.channel.send(`Artık ${kanal} kanalında çalışmayak, tekrar çalışması için aynı komutu kullanınız.`)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['çalışmakanal',"botkanal"],
  kategori:"bot",
  permLevel: 3
};

exports.help = {
  name: 'çalışma-kanal',
  description: 'Botun çalışacağı kanalları ayarlarsınız.',
  usage: 'çalışma-kanal #Kanal - çalışma-kanal liste'
};