const Discord = require("discord.js")
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwODMxNjcwNTUyMDA5MTEzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5ODEzMjY5fQ.-i0garIv6KgpSYQ7PLwbx1Km3yrecXxSjbRZG-DzEbg', client);

exports.run = async(client, message, args) => {
dbl.hasVoted(message.author.id).then(voted => {
    if (voted){
  if(!args[0]) return message.channel.send(`:x: Bir emoji adı girmelisin.`)
  let emoji = message.guild.emojis.find(emoji => emoji.name === args[0]);
  if (!emoji || !emoji.animated) return message.channel.send(`Bu sunucuda bu adta bir emoji yok veya belirtilen emoji hareketli bir emoji değil.`)
  message.channel.send({files: [emoji.url]});
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
  aliases: ["emojigönder"],
  kategori: "kullanıcı",
  permLevel: 0
};

exports.help = {
  name: 'animoji',
  description: 'İsmi girilen hareketli emojiyi atar.',
  usage: 'animoji <Emoji Adı>',
};