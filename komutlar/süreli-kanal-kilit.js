const Discord = require('discord.js')
const ms = require("ms");
const db = require("quick.db");

exports.run = async (client, message, args) => {
   let modlogs = db.get(`modlogkanaly_${message.guild.id}`)
  const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs)
const mb = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setTimestamp()

const emb = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setTimestamp()
if(!message.member.hasPermission("MANAGE_CHANNELS")){
  message.delete()
  message.channel.send(`Yeterli yetkiniz yok! **(Kanalları Yönet)**`).then(message => message.delete(5000))
  return;
}
/*let codare = message.mentions.channels.first()
if(!args[0]) return message.channel.send(mb.setDescription(`Bir kanalı etiketlemelisin.`))
if(!codare) return message.channel.send(mb.setDescription(`#**${args[0]}** kanalını sunucuda bulamıyorum.`))
 */ 
if(!args[0]) return message.channel.send(mb.setDescription(`Ne kadar süre kilitli kalacağını belirtmelisin.`))
let süre = args[0]
 .replace(`sn`, `s`)
  .replace(`dk`, `m`)
  .replace(`sa`, `h`)
  .replace(`g`, `d`)
.replace(`saniye`, `s`)
  .replace(`dakika`, `m`)
  .replace(`saat`, `h`)
  .replace(`gün`, `d`)
  
let kanal = message.guild.channel
let role = message.guild.roles.find(c => c.name === '@everyone');

message.channel.overwritePermissions(role, { 'SEND_MESSAGES': false })
message.channel.send(emb.setDescription(`Bu kanal <@${message.author.id}> tarafından ${süre.replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')} boyunca kilitlendi.`)).then(m => {
setTimeout(async () =>{  
message.channel.overwritePermissions(role, { 'SEND_MESSAGES': null })
m.edit(emb.setDescription(`Kanal kilidi açıldı.`))
}, ms(süre))
}
  )
    if(modlogs){
    const embed = new Discord.RichEmbed()
    .setColor("YELLOW")
    .setTitle("**[KANAL SÜRELİ OLARAK KİLİTLENDİ]**")
    .setThumbnail(message.author.avatarURL)
    .setDescription(`**:lock: <#${message.channel.id}> Kanalı <@${message.author.id}> Tarafından **${süre.replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')}** Süresi Boyunca \`\`KİLİLENDİ\`\`.**\n**Kanal İsmi:** \`\`${message.channel.name}\`\` **(ID: ${message.channel.id})**\n**Yetkili:** <@${message.author.id}> **(ID: ${message.author.id})**`)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL)
    modlogkanal.send(embed)
    }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["skk","sürelikilit","kanalsürelikilit","sürelikanalkilit"],
  permLevel: "Kanalları Yönet",
  kategori:"moderasyon"
};

exports.help = {
  name: 'süreli-kanal-kilit',
  description: 'Bota yazdığınız şeyi sesli mesaj olarak söyletir',
    usage: 'süreli-kanal-kilit <1saniye/1dakika/1saat/1gün>'
};// codare