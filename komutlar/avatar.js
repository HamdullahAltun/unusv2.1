const Discord = require('discord.js');
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwODMxNjcwNTUyMDA5MTEzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5ODEzMjY5fQ.-i0garIv6KgpSYQ7PLwbx1Km3yrecXxSjbRZG-DzEbg', client);

exports.run = (client, message, args) => { 
  dbl.hasVoted(message.author.id).then(voted => {
    if (voted){  
    let user = (message.mentions.users.first() || message.guild.members.get(args[0]) || message.author)
    
    const avatar = new Discord.RichEmbed()
        .setColor("RANDOM")
    .setURL(user.avatarURL)
    .setTitle(`:link: Tam Boyutta Açmak İçin Tıklayın`) 
        .setAuthor(`${user.username} Adlı Kullanıcının Profil Resmi`)
        .setImage(user.avatarURL)
        .setFooter(`İsteyen Kişi: ${message.author.tag}`)
    .setTimestamp()
    message.channel.send(avatar)
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
  aliases: ["pp",'avatar'],
  kategori: "kullanıcı",
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: 'Belirtilen Kişinin veya Komutu Yazan Kişinin Avatarını Atar.',
  usage: 'avatar <@kişi> veya avatar'
};