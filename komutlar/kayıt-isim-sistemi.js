const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
  let mesaj = args.slice(0).join(' ');
  if(!message.member.hasPermission("ADMINISTRATOR")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Yönetici)**`).then(message => message.delete(5000))
    return;
  }
  if (mesaj.length <= 3) {
return message.channel.send(`Lütfen isim sistemini ayarlamak için bir değişken belirtiniz. Örnek: \`${pref}kayıt-isim-sistemi -uye-\` yada \`${pref}kayıt-isim-sistemi -uye- | -yas-\``) 
}

db.set(`isimsistemi_${message.guild.id}`, mesaj)
  message.channel.send(`Kayıt olan kullanıcıların isimleri \`${mesaj}\` şeklinde düzenlenecektir.`)
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["kayıtisimsistemi","kayıtisimayarla"], 
  kategori: "kayıt",
  permLevel: 3
};

exports.help = {
  name: 'kayıt-isim-sistemi',
  description: 'Kayıttaki isim düzenlemesini ayarlarsınız.', 
  usage: 'kayıt-isim-sistemi -uye- yada kayıt-isim-sistemi -uye- | -yas-'
};
