
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

const prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Yönetici)**`).then(message => message.delete(5000))
    return;
  }
  
  let modlogs = db.get(`modlogkanaly_${message.guild.id}`)
  
  if(!modlogs) {
    return message.channel.send(`:warning: Bu sunucuda daha önceden modlog kanalı ayarlanmamış. Ayarlamak için: \`${prefix}mod-log <#kanal>\``)
  } else {
    if(modlogs) {    
      db.delete(`modlogkanaly_${message.guild.id}`)
      message.channel.send(`:white_check_mark: Modlog kanalı başarılı bir sıfırlandı!`)
    }
  }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sunuculogsıfırla',"logsıfırla","log-sıfırla","sunucu-log-sıfırla"],
  kategori: "sunucu",
    permLevel: 3
}

exports.help = {
    name: 'mod-log-sıfırla',
    description: 'Sunucu log kanalını sıfırlarsınız.',
    usage: 'mod-log-sıfırla <#kanal>'
}
