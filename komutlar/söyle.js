const Discord = require("discord.js")
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwODMxNjcwNTUyMDA5MTEzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5ODEzMjY5fQ.-i0garIv6KgpSYQ7PLwbx1Km3yrecXxSjbRZG-DzEbg', client);
const google = require("google-tts-api");

exports.run = (client, message) => {
  dbl.hasVoted(message.author.id).then(voted => {
    if (voted){
      const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send(`:warning: İlk önce bir sesli kanala girmelisiniz!`).then(message => message.delete(5000));
  message.delete();

  if(args.length < 1) return message.channel.send(`Lütfen sesli olarak söylenecek mesajı yazınız.`)
    google(`${args.slice(' ')}`, 'tr', 1).then(url => {
        message.member.voiceChannel.join().then(connection => {
            message.channel.send(`**${args.slice(' ')}** bot tarafından sesli olarak söyleniyor.`).then(message => message.delete(5000)); 
          message.delete()
            connection.playStream(url).on("end", () => {
                connection.disconnect();
            })
        })
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
    aliases: ['konuş'],
  kategori: "kullanıcı",
    permLevel: 0
};

exports.help = {
    name: 'söyle',
    description: 'Bota yazdığınız şeyi sesli mesaj olarak söyletir',
    usage: 'söyle <mesaj>'
};
