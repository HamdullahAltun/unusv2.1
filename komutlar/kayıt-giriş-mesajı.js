const Discord = require('discord.js');
const db = require('quick.db');

exports.run = (client, message, args) => { 
    let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
  let mesaj = args.slice(0).join(' ');
  if(!message.member.hasPermission("ADMINISTRATOR")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Yönetici)**`).then(message => message.delete(5000))
    return;
  }
  if (mesaj.length <= 3) {
return message.channel.send(`Yeni üye üeldiğinde gönderilmesi için bir şeyler yazınız. Örnek: Hoş Geldin -uye-. Kayıt Olmak İçin **-prefix-kayıtol** Komutunu Kullanabilirsin.`) 
}

db.set(`kayitGM_${message.guild.id}`, mesaj)
  message.channel.send(`Yeni üye geldiğinde kayıt kanalına \`${mesaj}\` mesajı atılacaktır.`)
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["kayıtgirişmesajı","kayıtgirişmesaj","kayıtgirenmesaj"], 
  kategori:"kayıt",
  permLevel: 3
};

exports.help = {
  name: 'kayıt-giriş-mesajı',
  description: 'Kayıt giriş mesajını ayarlarsınız.', 
  usage: 'kayıt-giriş-mesajı Hoş Geldin -uye-. Kayıt Olmak İçin **-prefix-kayıtol** Komutunu Kullanabilirsin.'
};
