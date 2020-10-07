const Discord = require('discord.js');
const moment = require('moment');
const ms = require('ms')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  let prefix = await db.fetch(`prefix.${message.guild.id}`) || '*'
  
  let room = message.mentions.channels.first()
  let title = args.slice(3).join(" ")
  let duration = args[1]
  let sure = args[2]
  let bisi;
  let filter = m => m.author.id === message.author.id;
  
  let moderasyonrol = await db.fetch(`moderasyonrol_${message.guild.id}`)
if(moderasyonrol){if(!message.member.hasPermission("MANAGE_GUILD") || !message.member.roles.has(moderasyonrol.id)){
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
  if (!room) return message.channel.send(`Çekiliş kanalını etiketlemelisin. \`${prefix}çekiliş #çekiliş 2 gün Steam Key\``)
  if (!duration || duration >= '60') return message.channel.send(`Bir süre yazmalısın. \`${prefix}çekiliş #çekiliş 2 gün Steam Key\``)
  if (!sure || !sure == 'saniye' || !sure == 'dakika' || !sure == 'saat' || !sure == 'gün' ) return message.channel.send(`Süreyi doğru yazmalısın. \`${prefix}çekiliş #çekiliş 2 gün Steam Key\``)
  if (!title) return message.channel.send(`Ödülü yazmalısın. \`${prefix}çekiliş #çekiliş 2 gün Steam Key\``)
  if (sure == 'saniye') bisi = 'seconds'
  if (sure == 'dakika') bisi = 'minutes'
  if (sure == 'saat') bisi = 'hours'
  if (sure == 'gün') bisi = 'days' 
  
  let giveEmbed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${title} Çekilişi`)
  .setDescription(`🎉 emojisine tıklayarak çekilişe katılabilirsiniz.\n\n**Çekiliş Süresi :** ${duration} ${sure}`)
  .setFooter(`Çekilişi Yapan Kişi : ${message.author.tag}`, message.author.avatarURL)
  .setTimestamp()
  message.delete()
  room.send(giveEmbed).then(m => {
   
    let re = m.react('🎉');
    setTimeout(() => {
      let users = m.reactions.get("🎉").users
      let list = users.array().filter(u => u.id !== client.user.id);
      let gFilter = list[Math.floor(Math.random() * list.length) + 0]
      
      let endEmbed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(`${title} Çekilişi`)
      .setDescription(`**Çekilişi Kazanan :** ${gFilter}`)
      .setFooter(`Çekilişi Yapan Kişi : ${message.author.tag}`, message.author.avatarURL)
      m.edit(endEmbed)
      room.send(`Tebrikler ${gFilter}. **${title}** Çekilişini Kazandın!`)
   }, ms(`${duration} ${bisi}`))
  });
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["çekilişyap","giveaway","gw"],
  permLevel: "Sunucuyu Yönet veya Moderasyon Rol",
  kategori: "moderasyon"
};

exports.help = {
  name: 'çekiliş',
  description: 'Çekiliş yaparsınız.',
  usage: 'çekiliş <#kanal> <süre> <ödül>'
};
   