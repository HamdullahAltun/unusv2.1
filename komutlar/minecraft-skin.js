const Discord = require("discord.js")
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwODMxNjcwNTUyMDA5MTEzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5ODEzMjY5fQ.-i0garIv6KgpSYQ7PLwbx1Km3yrecXxSjbRZG-DzEbg', client);

exports.run = async(client, message, args) => {
  dbl.hasVoted(message.author.id).then(voted => {
    if (voted){
let onlycode = args[0]
if(!onlycode) return message.channel.send(`:x: Bir seçenek belirtmelisin. Seçenekler: \`kafa, avatar, cilt.\``)
if(onlycode === `kafa`) {
let kişi = args[1]
if(!kişi) return message.channel.send(`:x: Kafasını göstereceğim kullanıcının ismini belirtmelisin.`)
message.channel.send(new Discord.Attachment(`https://minotar.net/helm/${kişi}`, `UnusMinecraftKafa.png`))
} else if(onlycode === `avatar`) {
let kişi = args[1]
if(!kişi) return message.channel.send(`:x: Avatarını göstereceğim kullanıcının ismini belirtmelisin.`)
message.channel.send(new Discord.Attachment(`https://minotar.net/body/${kişi}`, `UnusMinecraftAvatar.png`))
} else if(onlycode === `cilt`) {
let kişi = args[1]
if(!kişi) return message.channel.send(`:x: Cildini göstereceğim kullanıcının ismini belirtmelisin.`)
message.channel.send(new Discord.Attachment(`https://minotar.net/skin/${kişi}`, `UnusMinecraftCilt.png`))
}
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
  aliases: ["mcskin","minecraftskin"],
  kategori:"kullanıcı",
  permLevel: 0
};

exports.help = {
  name: 'minecraft-skin',
  description: 'Belirtilen kullanıcının Minecraft skinini alırsınız.',
  usage: 'minecraft-skin <Kafa/Avatar/Cilt> (Kullanıcı Adı)'
};