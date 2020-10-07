const Discord = require("discord.js")
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwODMxNjcwNTUyMDA5MTEzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5ODEzMjY5fQ.-i0garIv6KgpSYQ7PLwbx1Km3yrecXxSjbRZG-DzEbg', client);

exports.run = function(client, message, args) {
  dbl.hasVoted(message.author.id).then(voted => {
      if (voted){
    if(message.channel.type == "dm")  return;
  if(message.channel.type !== "text") return;
  if(!message.member.hasPermission("MANAGE_EMOJIS")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Emojileri Yönet)**`).then(message => message.delete(5000))
    return;
  }
  let guild = message.guild
  let [link, ad] = args.join(" ").split(" ");
  if (!link) return message.channel.send(`Lütfen emojinin **URLsini** belirtiniz.`)
  if (!ad) return message.channel.send(`Lütfen oluşturulacak **emojinin adını** belirtiniz.`)
  
  guild.createEmoji(link, ad)
    .then(emoji => message.channel.send(`**${emoji.name}** adında emoji oluşturuldu. (${emoji})`))
    .catch(error => {
      message.channel.send("Emoji oluşuturulurken hata oluştu!\n\nHata: " + error);
    })
  }else{
    const embed = new Discord.RichEmbed()
    .setColor("RED")
    .setThumbnail(message.author.avatarURL)
    .setDescription(`Bu komutu kullanmak için **Unus**'a oy vermelisiniz. [Oy vermek için tıklayın.](https://top.gg/bot/708316705520091136/vote)\n**Not:** Oy verdikten sonra hala komutu kullanamıyorsanız lütfen **2** dakika içinde tekrar deneyin.`)
    .setFooter(client.user.username, client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed)
    }
})

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['emoji-ekle','emojiekle','emojiyükle',"emojiçal"],
  kategori: "sunucu",
  permLevel: "Emojileri Yönet"
};

exports.help = {
  name: 'emoji-yükle',
  description: 'Belirttiğiniz link ve isimde emoji yükler.',
  usage: 'emoji-yükle <link> <isim>'
};