const Discord = require("discord.js")
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwODMxNjcwNTUyMDA5MTEzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5ODEzMjY5fQ.-i0garIv6KgpSYQ7PLwbx1Km3yrecXxSjbRZG-DzEbg', client);
var Jimp = require('jimp');

exports.run = async (client, message, args) => {
  dbl.hasVoted(message.author.id).then(voted => {
    if (voted){
      let user = (message.mentions.users.first() || message.guild.members.get(args[0]) || message.author)
    if (!message.guild) user = message.author;
   
    message.channel.send(`:timer: | Fotoğraf hazırlanıyor, lütfen bekleyin.`).then(m => m.delete(3000));

Jimp.read(user.avatarURL, (err, image) => {
    image.resize(315, 310)
    Jimp.read("https://cdn.discordapp.com/attachments/643085769358966813/646100707186835456/partner2.png", (err, avatar) => {
        avatar.resize(315, 320)
        image.composite(avatar, 1, 0).write(`./img/partner/${client.user.id}-${user.id}.png`);
        setTimeout(function() {
            message.channel.send(new Discord.Attachment(`./img/partner/${client.user.id}-${user.id}.png`));
        }, 1000);
    });

});
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
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  "kategori": "eğlence",
    permLevel: 0
  };
  
  exports.help = {
    name: 'partner',
    description: 'Fotoğrafınızın Üstüne Partner Logosu Ekler',
    usage: 'partner'
  };