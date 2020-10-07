const Discord = require("discord.js")
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwODMxNjcwNTUyMDA5MTEzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5ODEzMjY5fQ.-i0garIv6KgpSYQ7PLwbx1Km3yrecXxSjbRZG-DzEbg', client);
const Jimp = require('jimp');

exports.run = (client, message, params) => {
  dbl.hasVoted(message.author.id).then(voted => {
    if (voted){
      let user = (message.mentions.users.first() || message.guild.members.get(args[0]) || message.author)
  
      Jimp.read(user.avatarURL, function (err, image){
          image.resize(295, 295)
          if(err) return message.channel.send('Bir hata oluştu: ``'+err+'``\n Lütfen yapımcıya bildiriniz..');
          image.pixelate(10, 10, 10).write('./x-pixel/pixel.png');
          setTimeout(() => {
            message.channel.send({file: './x-pixel/pixel.png'});
          }, 500);
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
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pixel"],
  kategori:"eğlence",
  permLevel: 0
};

exports.help = {
  name: 'pixel',
  description: 'Avatarınızı pixelleştirir.',
  usage: 'pixel veya pixel <@kullanıcı>'
};