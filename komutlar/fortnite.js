const Discord = require('discord.js');
const fortnite = require('fortnitetracker-7days-stats');
const db = require('quick.db')

exports.run = (client, message, args) => {
  let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
    if(args.length < 2){
        message.channel.send(":x: Örnek Kullanım : `"+`${pref}`+"fortnite pc (Kullanıcı Adı)` ");
        return;
    }

    var name = "";
    for(var i = 1; i < args.length; i++){
        name += args[i] + " ";
    }
    name = name.trim(); // remove last space

    var url = "https://fortnitetracker.com/profile/pc/"
                                + encodeURIComponent(name);
    message.channel.startTyping();

    fortnite.getStats(name, "pc", (err, result) => {
        if(err){
            message.channel.send(":x: Kullanıcı Adı Hatalı!");
            message.channel.stopTyping();
            return;
        }
      
        var embed = new Discord.RichEmbed()
            .setAuthor(result.accountName, "", url)
            .setDescription('')
        .addField("Kazanılan Maçlar", result.wins)
        .addField("Oynanılan Oyunlar", result.matches)
        .addField("Kazanma Oranı", ~~result.wr + "%")
        .addField("Toplam Öldürme", + result.kills)
        .addField("K/D", + result.kd)
            .setColor("RANDOM")
            .setURL(url)
        .setFooter(`${message.author.tag} Tarafından İstenildi`)
            .setThumbnail(result.skinUrl);

        message.channel.stopTyping();
        message.channel.send(embed);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['fortnitebilgi'],
  kategori: "kullanıcı",
  permLevel: 0
};

exports.help = {
  name: 'fortnite',
  description: 'Kullanıcı adını yazdığınız kişinin fortnite istatistiklerini gösterir.',
  usage: 'fortnite pc pRx'
};