const Discord = require('discord.js');
const generator = require('generate-password');
const db = require('quick.db');

exports.run = function(client, message, args) {
  let prefix = db.fetch(`prefix.${message.guild.id}`) || "*"
    var uzunluk = args.slice(0).join(' ');

    if (!uzunluk) return message.reply(`Lütfen bir uzunluk belirt. **Doğru Kullanım**: ${prefix}şifre <uzunluk>`)

    var password = generator.generate({
        length: uzunluk,
        numbers: true,
    })

    message.channel.send(password);
  message.delete();
};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["parolaoluştur","şifreyarat","şifreoluştur"],
  kategori : "kullanıcı",
  permLevel: 0 
};

exports.help = {
  name: 'şifre-oluştur', 
  description: 'Belirttiğiniz uzunlukta rastgele bir şifre oluşturur.',
  usage: 'şifre-oluştur <uzunluk>'
};