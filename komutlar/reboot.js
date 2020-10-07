const Discord = require('discord.js');

exports.run = (client, message, args) => {
message.delete();
message.channel.send('Unus'+`'`+'u yeniden başlatmak için `yep` yaz')
.then(() => {
message.channel.awaitMessages(response => response.content === 'yep', {
max: 1,
time: 15000,
errors: ['time'],
})
.then((collected) => {
  message.channel.send(`Yeniden başlıyorum...`).then(msg => {
console.log(`Unus Yeniden Başlatılıyor...`);
process.exit(0);
})
})
.catch(() => {
  message.channel.send(`Yeniden başlatmayı iptal ettim`)
});
});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['reboot',"rr"],
  kategori: "yapımcı",
  permLevel: 4
};

exports.help = {
  name: 'reboot',
  description: 'Botu yeniden başlatır.',
  usage: 'reboot'
};
