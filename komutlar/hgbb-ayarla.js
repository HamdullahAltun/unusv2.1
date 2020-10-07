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

    if (!hgbbkanal) {
        let kanal = message.mentions.channels.first();
        if (!kanal) return message.reply(`:question: Lütfen kanal belirtin.`)

        db.set(`hgbbkanal_${message.guild.id}`, kanal.id)
        message.channel.send(`:white_check_mark: **HGBB** kanalı ${kanal} olarak ayarlandı.`)

    } else {
        if (hgbbkanal) {

            return message.channel.send(`:warning: Bu sunucuda daha önceden ayarlanmış kanal mevcut. Sıfırlamak için: ${pref}hgbb-sıfırla`)

        }
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hgbbayarla',"gelengidenayarla"],
  kategori: "sunucu",
    permLevel: 3
}

exports.help = {
    name: 'hgbb-ayarla',
    description: 'HGBB kanalını ayarlarsınız.',
    usage: 'hgbb-ayarla #kanal'
}