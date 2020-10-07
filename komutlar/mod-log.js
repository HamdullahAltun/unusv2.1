
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
  
  if(!message.member.hasPermission("ADMINISTRATOR")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Yönetici)**`).then(message => message.delete(5000))
    return;
  }

  let modlogs = db.get(`modlogkanaly_${message.guild.id}`)
  
  if(!modlogs) {
    let kanal = message.mentions.channels.first();
    if(!kanal) return message.reply(`:warning: Lütfen bir kanal giriniz! \nDoğru Kullanım; \`${pref}mod-log <#kanal>\``)

    db.set(`modlogkanaly_${message.guild.id}`, kanal.id)
    const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs);
    message.channel.send(`:white_check_mark: Modlog kanalı başarılı bir şekilde ayarlandı.`)
    
    } else {
      if(modlogs) {
        
        const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs);
        return message.channel.send(`:warning: Bu sunucuda daha önceden **modlog** kanalı ayarlanmış. Sıfırlamak için: **${pref}mod-log-sıfırla**\nAyarlanan kanal: <#${modlogkanal.id}>`)
        
      }
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sunuculog',"log","log-ayarla","mod-log-ayarla","modlogayarla","sunuculgoayarla","sunucu-log-ayarla","sunucu-log"],
  kategori: "sunucu",
    permLevel: 3
}

exports.help = {
    name: 'mod-log',
    description: 'Sunucu log kanalını ayarlarsınız.',
    usage: 'mod-log <#kanal>'
}
