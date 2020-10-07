const Discord = require('discord.js');

exports.run = (client, message) => {
  message.react("✅")
    return message.author.send(`**Unus**'un Özelliklerine bakmak veya botu daha kolay kontrol etmek için web sitesi: **https://unus.tk**`)
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["website","internetsitesi","botsite"],
  kategori: "bot",
  permLevel: 0
};

module.exports.help = {
  name: 'webpanel',
  description: 'Web panelinin linkini atar.',
  usage: 'webpanel'
};