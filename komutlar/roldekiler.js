const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let arg = args.slice(0).join(" ");

  if (isNaN(arg) || arg.length != 18)
    return message.reply("Lütfen Rol IDsi (1 tane) Belirtiniz!");

  let only = message.guild.roles
    .get(arg)
    .members.map(m => m.user.username)
    .join("    \n    ");
    if (only.content > 2048){
      only = "Çok Fazla Kişi Olduğu İçin Gösterilemiyor."
    }
const embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`<@&${arg}> Rolündeki Kişiler\n\*\*${only}\*\*`)
.setFooter(`${message.author.tag} Tarafından İstenildi.`)
.setTimestamp()
  message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["roldakikişiler"],
  kategori:"kullanıcı",
  permLevel: 0
};

exports.help = {
  name: "roldekiler",
  usage: "roldekiler (rol id)",
  description: "Belirttiğiniz Roldeki Kullanıcıları Listeler."
};