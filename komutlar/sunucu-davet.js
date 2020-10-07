const Discord = require("discord.js");
exports.run = async(client, message, args) => {
let onlycode = args[0]
  if(!onlycode || isNaN(onlycode)) return message.channel.send(`Davet linkini alacağın sunucunun ID'sini gir.`)
  client.guilds.get(onlycode).channels.filter(onlykod => onlykod.type === `text`).random().createInvite({maxAge: 0, maxUses: 0}).then(davet => {
    message.author.send(davet.url);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucudavet"],
  kategori: "yapımcı",
  permLevel: 4
};

exports.help = {
  name: 'sunucu-davet',
  description: 'Yapımcıya Özel',
  usage: 'sunucu-davet',
};