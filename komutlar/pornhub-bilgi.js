const Discord = require('discord.js');
const ph = require("pornhub");

exports.run = async (client, message, args) => {
  if (message.channel.nsfw === true) {
let kong = args[0]
if(!kong) return message.channel.send(":warning: Lütfen bir **PornHub** linki giriniz.")
ph.details(`${kong}`, function(err, details) {
const embed = new Discord.RichEmbed()
.setColor('#ffa31a')
.setTitle(details.title)
.setThumbnail(details.thumb)
.addField('Porno Süresi:\n', details.duration, true)
.addField('Porno Tagları:\n', details.tags, true)
.setFooter(`${message.author.tag} Tarafından istenildi.`)
.setTimestamp()
message.channel.send(embed)
});
}else {
    message.channel.send(":warning: Yanlış yere yazıyorsun dostum! Git kendine bir **nsfw** kanalı bul.")
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pornhub","pornbilgi","phbilgi","pornhubbilgi"],
  kategori: 'kullanıcı',
  permLevel: 0
};

exports.help = {
  name: "pornhub-bilgi",
  description: "Linkini girdiğiniz pornhub videosunun bilgilerini gösterir.",
  usage: "pornhub-bilgi <link>"
};