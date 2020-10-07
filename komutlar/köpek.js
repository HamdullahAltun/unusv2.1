const superagent = require("snekfetch");
const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  superagent.get("https://nekos.life/api/v2/img/woof").end((err, response) => {
    const embed = new Discord.RichEmbed()
      .setAuthor(`Tatlı Bir Köpek!`)
      .setTitle(":link: Resime Gitmek İçin Tıkla")
      .setImage(response.body.url)
      .setColor("RANDOM")
      .setURL(response.body.url);
    message.channel.send(embed);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['köpke',"köpüş"],
  kategori: "eğlence",
  permLevel: 0
};

exports.help = {
  name: "köpek",
  description: "Rastgele köpek resimleri atar.",
  usage: "köpek"
};