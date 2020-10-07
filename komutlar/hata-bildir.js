const Discord = require('discord.js')
const db = require('quick.db')

exports.run = (client, message, args) => {
  let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";

let guild = message.guild
let mesaj = args.slice(0).join(' ');
  if (mesaj.length < 3) return message.channel.send(`:x: Lütfen hatayı bildirin! Örnek Kullanım: **${pref}hatabildir kayıt sistemi çalışmıyor**`);
  message.channel.send(':page_facing_up: Hatanız başarıyla iletildi. Teşekürler.');
const tavsiye = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setThumbnail(message.author.avatarURL)
  .setDescription(':newspaper2: **' + message.author.tag + '** adlı kullanıcının Hatası')
  .addField(':envelope: Gönderen **Kişinin** Bilgileri', `• **Kullanıcı Adı:**  ${message.author.tag}\n• **Kullanıcı ID:**  ${message.author.id}`)
  .addField(':envelope: Gönderilen **Sunucu** Bilgileri', `• **Sunucu Adı:** ${guild.name}\n• **Sunucu ID:** ${guild.id}\n• **Sunucu Sahibi**: ${guild.owner.tag}(<@!${guild.owner.id}>)`)
  .addField(':pencil: Gönderilen **Hata**', mesaj)
return client.channels.get("733624724654915604").send(tavsiye);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hatabildirici',"bothatabildir","botunhatasınıbildir","hatabildir"],
  kategori: "bot", 
  permLevel: 0
};

exports.help = {
  name: 'hata-bildir',
  description: 'Botta bulunan hatayı yapımcıya bildirirsiniz.',
  usage: 'hata-bildir [hata]'
};