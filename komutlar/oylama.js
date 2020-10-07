const Discord = require('discord.js');
const db = require("quick.db");
 exports.run = (client, message, args) => {
     let moderasyonrol = db.fetch(`moderasyonrol_${message.guild.id}`)
   message.delete();
if(moderasyonrol){
  if(!message.member.hasPermission("MANAGE_GUILD") || !message.member.roles.has(moderasyonrol.id)){
  message.delete()
  message.channel.send(`Yeterli yetkiniz yok!`).then(message => message.delete(5000))
  return;
}}
   if(!moderasyonrol){
       if(!message.member.hasPermission("MANAGE_GUILD")){
  message.delete()
  message.channel.send(`Yeterli yetkiniz yok!`).then(message => message.delete(5000))
  return;
}
   }
   let question = args.join(' ');
   let user = message.author.username
   if (!question) return message.channel.send(`:x: Oylama yapılacak şeyi yazmalaısın:x:`).then(m => m.delete(5000));
     message.channel.sendEmbed(
       new Discord.RichEmbed()

       .setColor("RANDOM")
       .setThumbnail(client.user.avatarURL)
       .setTimestamp()
       .setFooter(`Oylama ${message.author.tag} tarafından başlatıldı.`, client.user.avatarURL)

       .addField(`**${message.guild.name} Sunucusu İçin Oylama Zamanı**`, `**${question}**`)).then(function(message) {

         message.react('✅');

         message.react('❌');

       });

     };

     exports.conf = {
       enabled: true,
       guildOnly: false,
       aliases: ['oylamayap',"oylamabaşlat"],
       kategori: "sunucu",
  permLevel: "Sunucuyu Yönet veya Moderasyon Rol"
};

exports.help = {
  name: 'oylama',
  description: 'Oylama yaparsınız.',
  usage: 'oylama <oylanacakşey>'
};