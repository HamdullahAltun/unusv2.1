const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
let kanal = message.mentions.channels.first() 
let sayı = args[1]
let kalan = args[1] - message.guild.memberCount
if(!message.member.hasPermission("ADMINISTRATOR")){
  message.delete()
  message.channel.send(`Yeterli yetkiniz yok! **(Yönetici)**`).then(message => message.delete(5000))
  return;
}
 
 if(!kanal) return message.channel.send(`
Lütfen Bir Kanal Belirt. :shrug:
Örnek Kullanım : 
\`\`\`
${pref}sayaç-ayarla #kanal <Sayı>
\`\`\`
`)
  
 if(isNaN(args[1])) return message.channel.send(`
Belirttiğin Sayı Çok Küçük Veya O Sayıya Zaten Ulaşmışsın :shrug:
Örnek Kullanım : 
\`\`\`
${pref}sayaç-ayarla #kanal <Sayı>
\`\`\`

`)
 
 if(message.guild.memberCount > args[1]) return message.channel.send(`
Belirttiğin Sayı Çok Küçük Veya O Sayıya Zaten Ulaşmışsın :shrug:
Örnek Kullanım : 
\`\`\`
${pref}sayaç-ayarla #kanal <Sayı>
\`\`\`
`)

 
  message.channel.send(`╔▬▬▬▬▬▬▬▬Sayaç▬▬▬▬▬▬▬▬▬
║► Sayaç Aktif Edildi.
║► Hedef kişi **${args[1]}** olarak ayarlandı!
║► Sayaç kanalı **${kanal}** olarak ayarlandı! 
║► **${args[1]}** Kişi Olmaya Son :fire: **${kalan}** :fire: Kişi Kaldı!
╚▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)

  
  db.set(`sayacK_${message.guild.id}`, kanal.id)  
  db.set(`sayacS_${message.guild.id}`, sayı) 
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['sayaçayarla',"sayacayarla","sayac-ayarla"], 
 kategori : "sayaç",
  permLevel: 3
};

exports.help = {
  name: 'sayaç-ayarla',
  description: 'Sayacı ayarlarsınız.', 
  usage: 'sayaç-ayarla #kanal <Sayı>'
};
