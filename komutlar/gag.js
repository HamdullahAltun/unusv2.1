const Discord = require("discord.js");
const ms = require("ms");
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {
    let mutelirolu = "GAG"
    let prefix = await db.fetch(`prefix.${message.guild.id}`) || "*"
    let modlogs = db.get(`modlogkanaly_${message.guild.id}`)
    const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs)

          if(!message.member.hasPermission("MUTE_MEMBERS")){
          message.delete()
  message.channel.send(`Yeterli yetkiniz yok! **(Üyeleri Sustur)**`).then(message => message.delete(5000))
  return;
        }
        
  let mutekisi = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!mutekisi) return message.reply(`:warning: Lütfen bir kullanıcı etiketleyiniz! \nDoğru Kullanım; \`${prefix}gag <@kullanıcı> <1sn/1dk/1sa/1g>\``).then(message => message.delete(5000));  
   if(mutekisi.roles.has(muterol.id)) return message.reply(`:warning: Bu kişi zaten gaglanmış!`).then(message => message.delete(5000)); 
  if(mutekisi.hasPermission("ADMINISTRATOR")) return message.reply(`:warning: Yetkili bir kişiyi gaglanamaz!`).then(message => message.delete(5000)); 
  message.delete()
  if(!muterol){
    try{
      muterol = await message.guild.createRole({
        name: mutelirolu,
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          ADD_FILES: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutezaman = args[1]
   .replace(`sn`, `s`)
  .replace(`dk`, `m`)
  .replace(`sa`, `h`)
  .replace(`g`, `d`)
.replace(`saniye`, `s`)
  .replace(`dakika`, `m`)
  .replace(`saat`, `h`)
  .replace(`gün`, `d`)

  if(!mutezaman) return message.reply(`:warning: Lütfen bir zaman giriniz! \nDoğru Kullanım; \`${prefix}gag <@kullanıcı> <1sn/1dk/1sa/1g>\``)
message.delete()
  await(mutekisi.addRole(muterol.id));
  message.reply(`<@${mutekisi.id}> kullanıcısı ${args[1].replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat').replace(/dk/, ' dakika').replace(/sn/, ' saniye').replace(/sa/, ' saat').replace(/g/, ' gün')} süresi boyunca gaglandı!`).then(message => message.delete(5000));  
  message.delete()
  
  if(modlogs){
    const embed = new Discord.RichEmbed()
    .setColor("YELLOW")
    .setTitle("**[KULLANICI TIKANDI]**")
    .setThumbnail(message.author.avatarURL)
    .setDescription(`**:lock: <@${mutekisi.id}> Adlı Kullanıcı <@${message.author.id}> Tarafından ${args[1].replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat').replace(/dk/, ' dakika').replace(/sn/, ' saniye').replace(/sa/, ' saat').replace(/g/, ' gün')} Süresi Boyunca \`\`TIKANDI\`\`.**\n**Tıkanan Kişi:** <@${mutekisi.id}> **(ID: ${mutekisi.id})**\n**Yetkili:** <@${message.author.id}> **(ID: ${message.author.id})**`)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL)
    modlogkanal.send(embed)
  }

  setTimeout(function(){
    mutekisi.removeRole(muterol.id);
    message.channel.send(`<@${mutekisi.id}> kullanıcısının gaglanması sona erdi!`).then(message => message.delete(5000));  
  }, ms(mutezaman));

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['tıka'],
  kategori: "moderasyon",
    permLevel: "Üyeleri Sustur"
  };
  
  exports.help = {
    name: "gag",
    description: "Etiketlediğiniz kişiye belirttiğiniz süre kadar gag atar. Yazı kanallarına yazı yazamaz.",
    usage: "gag <@kullanıcı> <1sn/1dk/1sa/1g>"
  };