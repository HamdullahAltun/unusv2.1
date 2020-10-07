const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
let rol = message.mentions.roles.first() 
let kanal = message.mentions.channels.first()

if(!message.member.hasPermission("ADMINISTRATOR")){
  message.delete()
  message.channel.send(`Yeterli yetkiniz yok! **(Yönetici)**`).then(message => message.delete(5000))
  return;
}
 if(!rol) return message.channel.send(`
Ayarlanması için bir rol etiketleyin.
Örnek Kullanım : ${pref}otorol @rol #kanal(Zorunlu Değil) 

 **Önemli Not!!:** Unus'un rolü verebilmesi için Unus'un verilecek rolün üstünde bir role sahip olduğundan emin olun.
`
)
 
  message.channel.send(`╔▬▬▬▬▬▬▬▬Otorol▬▬▬▬▬▬▬▬▬
║► **Otorol Aktif Edildi.**
║► Rol <@&${rol.id}> olarak ayarlandı! 
║► Mesaj kanalı **${kanal}** olarak ayarlandı! 
╚▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)

 
  db.set(`otoRL_${message.guild.id}`, rol.id)  
  db.set(`otoRK_${message.guild.id}`, kanal.id) 
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["otorolayarla","oto-rol-ayarla","oto-rolayarla"], 
  kategori: "otorol",
  permLevel: 3
};

exports.help = {
  name: 'otorol-ayarla',
  description: 'Otorolü ayarlarsınız.', 
  usage: 'otorol-ayarla @rol #kanal'
};
