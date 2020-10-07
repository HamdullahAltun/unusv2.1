const Discord = require("discord.js")
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwODMxNjcwNTUyMDA5MTEzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5ODEzMjY5fQ.-i0garIv6KgpSYQ7PLwbx1Km3yrecXxSjbRZG-DzEbg', client);
const {meme} = require('memejs');
const sozler = require('../subredditler');

exports.run = async (client, message, args) => {
  dbl.hasVoted(message.author.id).then(voted => {
    if (voted){
      const subreddit = sozler[Math.floor(Math.random() * sozler.length)]

 meme(subreddit,function(err, data) {
  message.channel.send(new Discord.Attachment(data.url));
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
})};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["meem","komikresim"],
  kategori: "eğlence",
  permLevel: 0
};

exports.help = {
  name: "meme",
  description: "Rastgele meme atar.",
  usage: "meme"
};