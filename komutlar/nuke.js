const Discord = require("discord.js");

exports.run = async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_CHANNELS")){
        message.delete()
        message.channel.send(`Yeterli yetkiniz yok!`).then(message => message.delete(5000))
        return;
      }
      message.channel.clone({ position: message.channel.position }).then(c => c.send(`Temizledim Moruq`, {
        file: "https://bhabertv.com/wp-content/uploads/2016/07/patlama-gif-2.gif" // Or replace with FileOptions object
    }))
      message.channel.delete();
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["patlat","kanalıpatlat"],
  kategori: "yetkili",
  permLevel: "Kanalları Yönet"
};

exports.help = {
  name: 'nuke',
  description: 'Yazdığınız Kanalı Siler Ve Yenisini Açar.',
  usage: 'nuke',
};