const Discord = require("discord.js");
const { get } = require("superagent");
module.exports.run = async (bot, message, args) => {
    try {
        if(!args[0]){
message.channel.send(' **UYARI**\n`Yazı giriniz ya da Türkçe karakter kullanmayınız Örnek: **ı** yerine **i** giriniz.!`')
return;
}
        let url = `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${args.join(" ")}`
        get(url).then(res => {
            const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor("Trump diyorki:")
            .setImage(res.body.message)
            setTimeout(() => {
                return message.channel.send(new Discord.Attachment(res.body.message, `UnusTrumpDiyor.png`));
            }, 100);
        });
    } catch(err) {
        console.log(err)    
    }
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["trumpdiyor","trump","trumpdiyorki"],
  kategori:"eğlence",
  permLevel: 0
};
 
module.exports.help = {
  name: 'trump-diyorki',
  description: 'Trump sizin dediklerinizi tweetler.',
  usage: 'trump-diyorki <yazı>'
};