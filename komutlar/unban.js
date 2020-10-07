const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  message.delete();
  let prefix = await db.fetch(`prefix.${message.guild.id}`) || "*";
    if(!message.member.hasPermission("BAN_MEMBERS")){
  message.delete()
  message.channel.send(`Yeterli yetkiniz yok! **(Üyeleri Yasakla)**`).then(message => message.delete(5000))
  return;
}
 
  let user = args[0];
    if  (!user) return message.channel.send
          ("Lütfen Yasaklaması Kaldırılacak Kişinin IDsini Yazınız!").catch(console.error).then
            (message.delete()).then
              (msg => msg.delete(5000));
  
    let reason = args.slice(1).join(' ')
 if (!reason) reason = 'Belirtilmemiş.'
  
  const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`<@${user}> Adlı Kullanıcının Yasaklamasını Kaldırmayı Onaylıyor Musunuz?`)
    .setFooter(bot.user.username, bot.user.avatarURL);
  message.channel.send(embed).then(async function(sentEmbed) {
    const emojiArray = ["✅","❎"];
    const filter = (reaction, user) =>
      emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
    await sentEmbed.react(emojiArray[0]).catch(function() {});
    await sentEmbed.react(emojiArray[1]).catch(function() {});
    var reactions = sentEmbed.createReactionCollector(filter, {
      time: 15000
    });
    reactions.on("end", () => sentEmbed.delete());
    reactions.on("collect", async function(reaction) {
      if (reaction.emoji.name === "✅") {
        message.channel.send(`**:unlock: **<@${user}>** Adlı Kullanıcının Yasaklaması Kaldırıldı.**`).then(msg => msg.delete(5000));
 
        message.guild.unban(user,`Sebep: ${reason} | Yetkili: ${message.author.tag} - ${message.author.id}`)
      }
      else if (reaction.emoji.name === "❎") {
        sentEmbed.delete();
        message.channel.send(`**İşlem İptal Edildi.**`).then(msg => msg.delete(5000));
      }
    });
  });
};
 
module.exports.conf = {
  aliases: ["yasaklamakaldır","yasakkaldır"],
  permLevel: "Üyeleri Yasakla",
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};
 
module.exports.help = {
  name: "unban",
  description: "IDsini giridğiniz kullanıcının yasaklamasını kaldırır.",
  usage: "unban <id>"
};