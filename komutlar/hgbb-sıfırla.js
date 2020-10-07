const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
    let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";

    if(!message.member.hasPermission("ADMINISTRATOR")){
        message.delete()
        message.channel.send(`Yeterli yetkiniz yok! **(Yönetici)**`).then(message => message.delete(5000))
        return;
      }
  
    let hgbbkanal = db.fetch(`hgbbkanal_${message.guild.id}`)
    
    if (hgbbkanal) {
        db.delete(`hgbbkanal_${message.guild.id}`)
        message.channel.send(`:white_check_mark: **HGBB** kanalı sıfırlandı.`)
    } else {
        if (!hgbbkanal) {

            return message.channel.send(`:warning: Bu sunucuda daha önceden ayarlanmış kanal mevcut değil. Ayarlamak için: ${pref}hgbb-ayarla #kanal`)

        }
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hgbb-sıfırla',"gelengidensıfırla"],
  kategori: "sunucu",
    permLevel: 3
}

exports.help = {
    name: 'hgbb-sıfırla',
    description: 'HGBB kanalını sıfırlarsınız.',
    usage: 'hgbb-sıfırla <#kanal>'
}