const Discord = require("discord.js");
const superagent = require("superagent");
const db = require('quick.db');
module.exports.run = async (client,message,args) => {
    let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
  let role = (message.mentions.roles.first() || message.guild.roles.get(args[0]))
  var hata = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`❌ Lütfen bir rol belirtiniz. Örnek: ${pref}rol-bilgi @Üye veya ${pref}rol-bilgi <rol ID>`);
  if(!role) return message.channel.send(hata);
 var moment = require('moment-timezone');
moment().tz("Europe/Istanbul").format();
          var tarih = ''
        if(moment(role.createdAt).format('MM') === '01') {
            var tarih = `${moment(role.createdAt).format('DD')} Ocak ${moment(role.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(role.createdAt).format('MM') === '02') {
            var tarih = `${moment(role.createdAt).format('DD')} Şubat ${moment(role.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(role.createdAt).format('MM') === '03') {
            var tarih = `${moment(role.createdAt).format('DD')} Mart ${moment(role.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(role.createdAt).format('MM') === '04') {
            var tarih = `${moment(role.createdAt).format('DD')} Nisan ${moment(role.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(role.createdAt).format('MM') === '05') {
            var tarih = `${moment(role.createdAt).format('DD')} Mayıs ${moment(role.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(role.createdAt).format('MM') === '06') {
            var tarih = `${moment(role.createdAt).format('DD')} Haziran ${moment(role.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(role.createdAt).format('MM') === '07') {
            var tarih = `${moment(role.createdAt).format('DD')} Temmuz ${moment(role.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(role.createdAt).format('MM') === '08') {
            var tarih = `${moment(role.createdAt).format('DD')} Ağustos ${moment(role.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(role.createdAt).format('MM') === '09') {
            var tarih = `${moment(role.createdAt).format('DD')} Eylül ${moment(role.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(role.createdAt).format('MM') === '10') {
            var tarih = `${moment(role.createdAt).format('DD')} Ekim ${moment(role.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(role.createdAt).format('MM') === '11') {
            var tarih = `${moment(role.createdAt).format('DD')} Kasım ${moment(role.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(role.createdAt).format('MM') === '12') {
            var tarih = `${moment(role.createdAt).format('DD')} Aralık ${moment(role.createdAt).format('YYYY HH:mm:ss')} `
        }
  var roleinfoEmbed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .addField('**✏ Rol İsmi**', role.name, true)
  .addField('**🆔 ID**', role.id, true)
  .addField('**👥 Role Sahip Kullanıcılar**', role.members.size, true)
  .addField('**💙 Renk**', role.hexColor, true)
  .addField('**📣 Etiketlenebilirlik**', role.mentionable ? '\nEtiketlenebilir' : 'Etiketlenemez', true)
  .addField('**📅 Oluşturulma Zamanı**', tarih, true)
  .setTimestamp()
  .setFooter(`${message.author.tag} Tarafından istenildi.`);
  
  message.channel.send(roleinfoEmbed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['rolinfo','rolhakkında',"rolbilgi"],
  permLevel: 0,
  kategori: "kullanıcı"
};

exports.help = {
  name: 'rol-bilgi',
  description: 'Belirttiğiniz rol hakkında bilgi verir.',
  usage: 'rol-bilgi @rol veya rol-bilgi <rol ID>'
};