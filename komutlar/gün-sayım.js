const Discord = require("discord.js");
const moment = require("moment");

exports.run = async (client, message, args) => {
  let pingUye = message.mentions.users.first() || message.author;
  const pingDiscordTarih = new Date().getTime() - pingUye.createdAt.getTime();
  const pingSunucuTarih =
    new Date().getTime() -
    message.guild.members.get(pingUye.id).joinedAt.getTime();
  const pingGün = moment
    .duration(pingDiscordTarih)
    .format("D [gün], hh [saat], mm [dakika'dır]");
  const pingGün2 = moment
    .duration(pingSunucuTarih)
    .format("D [gün], hh [saat], mm [dakika'dır]");
  message.channel.send(
    `:100: \`${pingGün}\` **Discord**'a kayıtlı.\n:100: \`${pingGün2}\` **sunucumuz**'a üye.`
  );
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["günsayim","günsayım"],
  kategori: "kullanıcı", 
  permLevel: 0
};

exports.help = {
  name: "gün-sayım",
  description: "Discord'a ve bulunduğunuz sunucuya kayıtlı olduğunuz zamanı verir.",
  usage: "gün-sayım"
};
