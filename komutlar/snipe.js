const Discord = require("discord.js")
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwODMxNjcwNTUyMDA5MTEzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5ODEzMjY5fQ.-i0garIv6KgpSYQ7PLwbx1Km3yrecXxSjbRZG-DzEbg', client);
const db = require('quick.db');

exports.run = (client, message, args) => {
	  let prefix = (db.fetch(`prefix.${message.guild.id}`)) || "*";
		  const snipedb = db.fetch(`snipesistemi_${message.guild.id}`)
  if (!snipedb) return message.channel.send(`Snipe sistemi aktif değil. Aktifleştirmek için **${prefix}snipe-aktif** komutunu kullanınız.`)
    dbl.hasVoted(message.author.id).then(voted => {
        if (voted){
let unus = db.get(`unus.silinenmesaj_${message.channel.id}`)
if(!unus) return message.channel.send(`:x: Bu kanalda önceden bir mesaj silinmemiş.`)
const embed = new Discord.RichEmbed()
 .setColor('BLUE')
 .setAuthor(client.users.get(unus.sahip).tag, client.users.get(unus.sahip).avatarURL)
 .addField(`Son Silinen Mesaj İçeriği`, unus.mesaj)
 .setFooter(`${message.author.tag} Tarafından istenildi`, client.user.avatarURL)
 .setTimestamp(unus.tarih) 
message.channel.send(embed)
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
 aliases: ["sonsilinenmesaj","sonsilinen"],
 permLevel: 0,
 kategori: "kullanıcı"
};

exports.help = {
 name: 'snipe',
 description: 'Son silinen mesajı gösterir.',
 usage: 'snipe'
};