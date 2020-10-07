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
  
  let resimligiris = db.get(`resimlihgbb_${message.guild.id}`)
  
  if(!resimligiris) {
    let kanal = message.mentions.channels.first();
    if(!kanal) return message.reply(`:warning: Lütfen bir kanal giriniz! \nDoğru Kullanım; \`${pref}resimli-giriş-çıkış-ayarla <#kanal>\``)

    db.set(`resimlihgbb_${message.guild.id}`, kanal.id)
    const resimkanal = message.guild.channels.find(kanal => kanal.id === resimligiris);
    message.channel.send(`:white_check_mark: Resimli HG-BB kanalı başarılı bir şekilde ayarlandı.`)
    
    } else {
      if(resimligiris) {
        
        const resimkanal = message.guild.channels.find(kanal => kanal.id === resimligiris);
        return message.channel.send(`:warning: Bu sunucuda daha önceden **Resimli HG-BB kanalı** ayarlanmış. Sıfırlamak için: **${pref}resimli-giriş-çıkış-sıfırla**\nAyarlanan kanal: <#${resimkanal.id}>`)
        
      }
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['resimligirişayarla',"resimligirişçıkışayarla","resimlihgbbayarla"],
  kategori: "sunucu",
    permLevel: 3
}

exports.help = {
    name: 'resimli-giriş-çıkış-ayarla',
    description: 'Resimli giriş-çıkış kanalını ayarlarsınız.',
    usage: 'resimli-giriş-çıkış-ayarla #kanal'
}
