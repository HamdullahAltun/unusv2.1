
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  let prefix = (db.fetch(`prefix.${message.guild.id}`)) || "*";
  
  if(!message.member.hasPermission("ADMINISTRATOR")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Yönetici)**`).then(message => message.delete(5000))
    return;
  }
  
  let resimligiris = db.get(`resimlihgbb_${message.guild.id}`)
  
  if(!resimligiris) {
    return message.channel.send(`:warning: Bu sunucuda daha önceden **resimli hg-bb** kanalı ayarlanmamış. Ayarlamak için: \`${prefix}resimli-giriş-çıkış-ayarla <#kanal>\``)
  } else {
    if(resimligiris) {    
      db.delete(`resimlihgbb_${message.guild.id}`)
      message.channel.send(`:white_check_mark: **Resimli HG-BB** kanalı başarılı bir **sıfırlandı**!`)
    }
  }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['resimligirişsıfırla',"resimligirişçıkışsıfırla","resimlihgbbsıfırla"],
  kategori: "sunucu",
    permLevel: 3
}

exports.help = {
    name: 'resimli-giriş-çıkış-sıfırla',
    description: 'Resimli giriş-çıkış kanalını sıfırlarsınız.',
    usage: 'resimli-giriş-çıkış-sıfırla'
}