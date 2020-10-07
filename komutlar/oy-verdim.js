const Discord = require("discord.js")
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwODMxNjcwNTUyMDA5MTEzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5ODEzMjY5fQ.-i0garIv6KgpSYQ7PLwbx1Km3yrecXxSjbRZG-DzEbg', client);

exports.run = async (client, message, args) => {
  
   if(message.guild.id !== '684402439402946587') return message.channel.send('Bu komut sadece destek sunucumda çalışmaktadır.')
 
    if(message.member.roles.has('711663700515356743') === true) return message.channel.send(`Zaten Destekçi Rolünüz Bulunmakta.`)

dbl.hasVoted(message.author.id).then(voted => {
    if (voted){
    
  const embed = new Discord.RichEmbed()
  .setColor('BLUE')
  .setDescription(`<@${message.member.id}> **Unus'**u oyladığınız için teşekkürler. <@&711663700515356743> rolünüzü verildi , 12 saat sonra rolünüz otomatik alınacaktır ve tekrar oy vererek rolü tekrar alabilirsiniz.`)
    .setFooter(client.user.username, client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed)
  message.member.addRole('711663700515356743')
    }
    else{
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
  aliases: ["oyverdim"],
  permLevel: 0,
  kategori: "bot"
};

exports.help = {
  name: 'oy-verdim',
  description: 'Oy vererek destek sunucusunda destekçi rolünü alabilirsiniz',
  usage: 'oy-verdim'
};
