const Discord = require("discord.js"); 
const client = new Discord.Client();
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async(client, message, args) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  const uyeler = client.guilds.reduce((a, b) => a + b.memberCount, 0)

    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`:bar_chart: ${client.user.username} Bot İstatistikleri`)
    .addField(':timer: Gecikme: ', client.ping + 'ms',true)
    .addField(':construction_worker: Çalışma Süresi: ', `${duration}`,true)
    .addField(':busts_in_silhouette: Kullanıcılar:', `${uyeler}`,true)
    .addField(':tv: Kanallar:', client.channels.size,true)
    .addField(':clipboard: Sunucular:', client.guilds.size,true)
    .addField(':desktop: Bellek kullanımı:', (process.memoryUsage().heapUsed / 2048 / 2048).toFixed(2),true)
    .addField(':book: Kütüphane:', `Discord.js`,true)
    .addField(`Discord.js sürümü:`, Discord.version,true)
      .addField(':spy: Yapımcım:', '<@385001389119504384> \n `Hamdullah ALTUN`',true)
    .setFooter(`${client.user.username}`, client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
}
exports.conf = {
  enabled: true,
    guildOnly: true,
  aliases: ['istatistik','bot-bilgi',"botbilgi","i"],
  kategori: "bot",
  permLevel: 0
};

exports.help = {
  name: 'istatistik',
  description: 'Bot ile ilgili istatistikleri gösterir.',
  usage: 'istatistik'
};
