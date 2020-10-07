const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
    let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
  
  let isim31 = await db.fetch(`isimsistemi_${message.guild.id}`);
  let ch = await db.fetch(`kayitKanal_${message.guild.id}`);
  let ar = await db.fetch(`kayitAR_${message.guild.id}`);
  let vr = await db.fetch(`kayitVR_${message.guild.id}`);
  let lh = await db.fetch(`kayitLog_${message.guild.id}`);
  let ototag = db.fetch(`ototag_${message.guild.id}`)
  
  if (!isim31) return 
  if (!ch) return message.channel.send(`Kayıt sistemi ayarlı değildir. Ayarlamak için **${pref}kayıt-sistemi**`).then(message => message.delete(5000))
  if (!ar) return
  if (!vr) return 
  if (!lh) return
  if (!isim31.includes(`-yas-`)) {
    
  if(!ototag){
  let isim = args[0]
  let yas = args[1];
  if (!isim) return message.channel.send(`Seni Kayıt Etmem İçin Bir İsim Girmelisin : \`${pref}kayıtol Ahmet\``)
 
  message.reply(`Kaydınız Oluşturuldu.`)
  message.member.setNickname(isim31.replace("-uye-", `${isim}`))
  message.member.removeRole(message.guild.roles.get(ar));
  message.member.addRole(message.guild.roles.get(vr));
      
  return client.channels.get(lh).send(`:scroll: <@${message.author.id}> İçin Kayıt İşlemi Başarı İle Tamamlandı. :clipboard:`)}
    
   if(ototag){
  let isim = args[0]
  let yas = args[1];
  if (!isim) return message.channel.send(`Seni Kayıt Etmem İçin Bir İsim Girmelisin : \`${pref}kayıt-ol Ahmet\``)
 
  message.reply(`Kaydınız Oluşturuldu.`)
     var sonuc = db.fetch(`ototag_${message.guild.id}`).replace("-uye-", `${isim}`)
  message.member.setNickname(sonuc)
  message.member.removeRole(message.guild.roles.get(ar));
  message.member.addRole(message.guild.roles.get(vr));
      
  return client.channels.get(lh).send(`:scroll: <@${message.author.id}> İçin Kayıt İşlemi Başarı İle Tamamlandı. :clipboard:`)}
  }
  if (isim31.includes(`-yas-`)) {
  if(!ototag){
  let isim = args[0]
  let yas = args[1];
  if (!isim) return message.channel.send(`Seni Kayıt Etmem İçin Bir İsim Girmelisin : \`${pref}kayıt-ol Ahmet 19\``)
  if (!yas) return message.channel.send(`Seni Kayıt Etmem İçin Bir Yaş Girmelisin : \`${pref}kayıt-ol Ahmet 19\``)

  
    message.reply(`Kaydınız Oluşturuldu.`)
  message.member.setNickname(isim31.replace("-uye-", `${isim}`).replace("-yas-", `${yas}`))
  message.member.removeRole(message.guild.roles.get(ar));
  message.member.addRole(message.guild.roles.get(vr));
      
  client.channels.get(lh).send(`:scroll: <@${message.author.id}> İçin Kayıt İşlemi Başarı İle Tamamlandı. :clipboard:`)}
  
  if(ototag){
  let isim = args[0]
  let yas = args[1];
  if (!isim) return message.channel.send(`Seni Kayıt Etmem İçin Bir İsim Girmelisin : \`${pref}kayıt-ol Ahmet 19\``)
  if (!yas) return message.channel.send(`Seni Kayıt Etmem İçin Bir Yaş Girmelisin : \`${pref}kayı-tol Ahmet 19\``)

  
    message.reply(`Kaydınız Oluşturuldu.`)
    var sonuc = db.fetch(`ototag_${message.guild.id}`).replace("-uye-", `${isim}`).replace("-yas-", `${yas}`)
  message.member.setNickname(sonuc)
  message.member.removeRole(message.guild.roles.get(ar));
  message.member.addRole(message.guild.roles.get(vr));
      
  client.channels.get(lh).send(`:scroll: ${message.author.tag}-**(${message.author.id})** İçin Kayıt İşlemi Başarı İle Tamamlandı. :clipboard:`)}}
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kayıtol"],
  kategori: "kayıt",
  permLevel: 0
}
exports.help = {
  name: "kayıt-ol",
  description: "Kayıt olmanızı sağlar.",
  usage: "kayıt-ol Ahmet 19"
}
