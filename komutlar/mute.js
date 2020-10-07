const Discord = require("discord.js");
const ms = require("ms");
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {
    let mutelirolu = "Muted"
    let prefix = await db.fetch(`prefix.${message.guild.id}`) || "*"
    let modlogs = db.get(`modlogkanaly_${message.guild.id}`)
    const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs)
    let muterol = message.guild.roles.find(r => r.name === mutelirolu)

              if(!message.member.hasPermission("MUTE_MEMBERS")){
              message.delete()
      message.channel.send(`Yeterli yetkiniz yok! **(Üyeleri Sustur)**`).then(message => message.delete(5000))
      return;
            }
            
  let mutekisi = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!mutekisi) return message.reply(`:warning: Lütfen bir kullanıcı etiketleyiniz! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``).then(message => message.delete(5000));  
  if(mutekisi.hasPermission("ADMINISTRATOR")) return message.reply(`:warning: Yetkili bir kişiyi susturulamaz!`).then(message => message.delete(5000)); 
  message.delete()
  if(!muterol){
    try{
      muterol = await message.guild.createRole({
        name: mutelirolu,
        color: "#000000",
        permissions:[]
      })
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

  if(!mutezaman) return message.reply(`:warning: Lütfen bir zaman giriniz! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)
message.delete()
  await(mutekisi.setMute(true, `gaglandın`));
  message.reply(`<@${mutekisi.id}> kullanıcısı ${args[1].replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat').replace(/dk/, ' dakika').replace(/sn/, ' saniye').replace(/sa/, ' saat').replace(/g/, ' gün')} süresi boyunca susturuldu!`).then(message => message.delete(5000));  
  message.delete()

  if(modlogs){
    const embed = new Discord.RichEmbed()
    .setColor("YELLOW")
    .setTitle("**[KULLANICI SUSTURULDU]**")
    .setThumbnail(message.author.avatarURL)
    .setDescription(`**:lock: <@${mutekisi.id}> Adlı Kullanıcı <@${message.author.id}> Tarafından ${args[1].replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat').replace(/dk/, ' dakika').replace(/sn/, ' saniye').replace(/sa/, ' saat').replace(/g/, ' gün')} Süresi Boyunca \`\`SUSTURULDU\`\`.**\n**Susturulan Kişi:** <@${mutekisi.id}> **(ID: ${mutekisi.id})**\n**Yetkili:** <@${message.author.id}> **(ID: ${message.author.id})**`)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL)
    modlogkanal.send(embed)
  }

  setTimeout(function(){
    mutekisi.setMute(false,`Süresi dolduğu için susturması kaldırıldı.`)
    message.channel.send(`<@${mutekisi.id}> kullanıcısının susturulması sona erdi!`).then(message => message.delete(5000));  
  }, ms(mutezaman));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sustur'],
    kategori: "moderasyon",
    permLevel: "Üyeleri Sustur"
  };
  
  exports.help = {
    name: "mute",
    description: "Etiketlediğiniz kişiye belirttiğiniz süre kadar mute atar. Ses kanallarında konuşamaz.",
    usage: "mute <@kullanıcı> <1sn/1dk/1sa/1g>"
  };