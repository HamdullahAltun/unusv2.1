const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
  message.react("✅")
	const pingozel = new Discord.RichEmbed()
    .setColor('BLUE')
    .setTimestamp()
  .setThumbnail(client.user.avatarURL)
    .setAuthor(message.author.username, message.author.avatarURL)
  .setTitle(':link: Unus'+`'`+'u Davet Et!')
    .setURL(`https://discord.com/oauth2/authorize?client_id=708316705520091136&scope=bot&permissions=8`)
    return message.author.send(pingozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['botudavetet','botuekle', 'invite','davetet'],
  kategori: "bot",
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Botun davet linkini gönderir.',
  usage: 'davet'
};
