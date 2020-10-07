const Discord = module.require('discord.js');
const client = new Discord.Client();

module.exports.run = async (bot, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('İşte O Şanslı kullanıcı:')
    .setDescription(`<@${message.guild.members.random().id}>`)
    .setThumbnail(message.author.avatarURL)
    .setFooter(`${message.author.tag} Tarafından istenildi.`)
    .setTimestamp()
    message.channel.send(embed)
}

exports.conf = {
  enabled: true,
    guildOnly: true,
  aliases: ['rastgelekişi','rastgelebirisi',"rastgelekullanıcı"],
  kategori: "kullanıcı", 
  permLevel: 0
};

exports.help = {
  name: 'rastgele-kullanıcı', 
  description: "Sunucudan rastgele birisini seçersiniz.",
  usage: "rastgele-kullanıcı" 
};