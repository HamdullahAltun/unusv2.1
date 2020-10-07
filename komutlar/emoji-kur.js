const Discord = require("discord.js")
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwODMxNjcwNTUyMDA5MTEzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5ODEzMjY5fQ.-i0garIv6KgpSYQ7PLwbx1Km3yrecXxSjbRZG-DzEbg', client);
const db = require('quick.db');


exports.run = (client, message, args) => {
  dbl.hasVoted(message.author.id).then(voted => {
    if (voted){
  if(!message.member.hasPermission("MANAGE_EMOJIS")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Emojileri Yönet)**`).then(message => message.delete(5000))
    return;
  }
  let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";

  if (!args[0]) {
message.channel.send(`Lütfen **${pref}emoji-kur bilgi** kullanınız.`)
}
  
  if (args[0] === "bilgi") {
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription("")
        .setColor("RANDOM")
        .setFooter(`${message.author.tag} Tarafından İstendi`, client.user.avatarURL)
        .setTimestamp()
        .addField(
          `**__${pref}EMOJİKUR BİLGİLENDİRME__**`,
          ` Emoji Kurulum Öncesi Mutlaka Bota Yönetici Yetkisi Veriniz.\nSunucunun Emoji Slotunun Boş Olduğundan Emin Olunuz.\nSonraki Aşama Için ${pref}emoji-kur kurulum Yazınız.`
        )
    );
  }

  if (args[0] == "kurulum") {
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription("")
        .setColor("RANDOM")
        .setFooter(`${message.author.tag} Tarafından İstendi`, client.user.avatarURL)
        .setTimestamp()
        .addField(
          `**__${pref}EMOJİKUR KURULUM AŞAMASI__**`,
          ` Emoji Kurulum Öncesi Aşamalar Tamamlandı ise Komutu Giriniz\n**${pref}emoji-kur başlat** `
        )
    );
  }

  if (args[0] == "başlat")
    message.channel.send(
      `Kurulum Başlatılsın mı? \n**evet** olarak cevaplayınız...\n10 Saniye Sonra Iptal Edilir.`
    );
  message.channel
    .awaitMessages(response => response.content === "evet", {
      max: 1,
      time: 10000,
      errors: ["time"]
    })
    .then(collected => {
      message.channel.send("Kurulum Başlatılıyor..");

      message.guild
        .createEmoji(`https://i.imgyukle.com/2020/05/05/riXHCn.gif`, "tik1")
        .then(tm => {
          message.channel.send("Emoji oluşturuldu");
        })
        .catch(error => {
          message.channel.send("Hata oluştu!\n\n" + error);
        })
        .then(Emoji =>
          message.guild
            .createEmoji(`https://i.imgyukle.com/2020/05/05/riXY6h.gif`, "tik2")
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(`https://i.imgyukle.com/2020/05/05/riXSOx.gif`, "kalp")
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riXCRv.png`,
              "budur"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        
        
          message.guild
            .createEmoji(`https://i.imgyukle.com/2020/05/05/riXJyq.png`, "yok")
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riXV6P.png`,
              "kapak"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(`https://i.imgyukle.com/2020/05/05/riY38p.gif`, "no1")
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(`https://i.imgyukle.com/2020/05/05/riYlEy.gif`, "tik3")
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riYtLM.gif`,
              "budur"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riYFqh.gif`,
              "maden"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riYM7n.gif`,
              "alarm"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riY4Gj.gif`,
              "alarm1"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(`https://i.imgyukle.com/2020/05/05/riYfrU.gif`, "pin")
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riYwhH.gif`,
              "alkis"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riak7G.gif`,
              "biciku"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(`https://i.imgyukle.com/2020/05/05/riaEIS.gif`, "no2")
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riaRGb.png`,
              "satis"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(`https://i.imgyukle.com/2020/05/05/riaV4s.png`, "eyw")
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(`https://i.imgyukle.com/2020/05/05/riaJyQ.gif`, "tik4")
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riarlc.gif`,
              "hayde"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riaCRR.png`,
              "agabe"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riaSNe.gif`,
              "alarm3"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riaIIq.gif`,
              "teslim"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riaXOy.gif`,
              "money"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(`https://i.imgyukle.com/2020/05/05/riHvuY.gif`, "tik5")
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(`https://i.imgyukle.com/2020/05/05/riH2X6.png`, "cat1")
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riHwk1.png`,
              "salak"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(`https://i.imgyukle.com/2020/05/05/riHAwG.png`, "lol")

            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riLC0P.gif`,
              "dance"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riL5Z0.png`,
              "kovboy"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riLNLy.png`,
              "saskincat"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(`https://i.imgyukle.com/2020/05/05/riLmL1.png`, "amen")
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riL2bb.png`,
              "patladik"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riNP2y.gif`,
              "dance2"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(`https://i.imgyukle.com/2020/05/05/riNRmn.png`, "stop")
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riNTmG.gif`,
              "dance3"
            )

            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riO81e.png`,
              "nocat"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riOFxP.png`,
              "rifcat"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riOMpq.png`,
              "bloodguncat"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/rijPxh.png`,
              "eywreyiz"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/rijyK1.png`,
              "coolka"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/rijxDG.png`,
              "assaas"
            )

            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/rijehj.gif`,
              "dance4"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/rij3lo.png`,
              "saassa"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(`https://i.imgyukle.com/2020/05/05/rijlEU.png`, "neee")
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/rij4Gf.png`,
              "uzgunsad"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(`https://i.imgyukle.com/2020/05/05/rijwhb.png`, "sadd")
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(`https://i.imgyukle.com/2020/05/05/rij0ls.png`, "ne3")
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/rijARQ.png`,
              "parabanka"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        )
        .then(Emoji =>
          message.guild
            .createEmoji(
              `https://i.imgyukle.com/2020/05/05/riXP2c.gif`,
              "200iq"
            )
            .catch(error => {
              message.channel.send("Hata oluştu!\n\n" + error);
            })
        );
  message.channel.send("Tamamlandı")
  });
}else{
  const embed = new Discord.RichEmbed()
  .setColor("RED")
  .setThumbnail(message.author.avatarURL)
  .setDescription(`Bu komutu kullanmak için **Unus**'a oy vermelisiniz. [Oy vermek için tıklayın.](https://top.gg/bot/708316705520091136/vote)\n**Not:** Oy verdikten sonra hala komutu kullanamıyorsanız lütfen **2** dakika içinde tekrar deneyin.`)
  .setFooter(client.user.username, client.user.avatarURL)
  .setTimestamp()
  message.channel.send(embed)
  }
})

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["emojikur"],
  permLevel: "Emojileri Yönet",
  kategori:"sunucu"
};

exports.help = {
  name: "emoji-kur",
  description: "Sunucunuza emojiler ekler.",
  usage: "emoji-kur bilgi"
};