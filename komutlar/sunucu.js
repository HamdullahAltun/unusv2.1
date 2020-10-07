
const Discord = require('discord.js');
const moment = require ("moment");
const db = require('quick.db');

exports.run = function(client, message, args) {
    let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
if(!message.channel.guild) return 
var konum = ''
        if(message.guild.region === "russia") {
            var konum = 'Rusya :flag_ru:'
        }
        if(message.guild.region === "us-west") {
            var konum = 'Batı Amerika :flag_us: '
        }
        if(message.guild.region === "us-south") {
            var konum = 'Güney Amerika :flag_us: '
        }
        if(message.guild.region === "us-east") {
            var konum = 'Doğu Amerika :flag_us: '
        }
        if(message.guild.region === "us-central") {
            var konum = 'Amerika :flag_us: '
        }
        if(message.guild.region === "brazil") {
            var konum = 'Brezilya :flag_br:'
        }
        if(message.guild.region === "singapore") {
            var konum = 'Singapur :flag_sg:'
        }
        if(message.guild.region === "sydney") {
            var konum = 'Sidney :flag_sh:'
        }
        if(message.guild.region === "eu-west") {
            var konum = 'Batı Avrupa :flag_eu:'
        }
        if(message.guild.region === "eu-south") {
            var konum = 'Güney Avrupa :flag_eu:'
        }
        if(message.guild.region === "eu-east") {
            var konum = 'Doğu Avrupa :flag_eu:'
        }
        if(message.guild.region === "eu-central") {
            var konum = 'Avrupa :flag_eu:'
        }
        if(message.guild.region === "hongkong") {
            var konum = 'Hong Kong :flag_hk: '
        }
        if(message.guild.region === "japan") {
            var konum = 'Japonya :flag_jp:'
        }
          if(message.guild.region === "europe") {
            var konum = 'Avrupa :flag_eu:'
        }
        var tarih = ''
        if(moment(message.guild.createdAt).format('MM') === '01') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Ocak ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '02') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Şubat ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '03') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Mart ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '04') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Nisan ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '05') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Mayıs ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '06') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Haziran ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '07') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Temmuz ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '08') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Ağustos ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '09') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Eylül ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '10') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Ekim ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '11') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Kasım ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '12') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Aralık ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
const verificationLevels = ['Yok', 'Düşük', 'Orta', 'Yüksek', 'Çok Yüksek'];
let roles = client.guilds.get(message.guild.id).roles.map(r => r.name);
var embed  = new Discord.RichEmbed()
.setAuthor(message.guild.name, message.guild.iconURL)
.addField("**🆔 Sunucu ID'si: **", message.guild.id,true)
.addField("**📅 Oluşturulduğu Zaman **", tarih,true)
.addField("**👑 Sahibi **",`<@${message.guild.owner.user.id}>`,true)
.addField(`**👥 Üyeler [${message.guild.memberCount}] **`,`**${message.guild.members.filter(m => m.presence.status != "offline" && !m.user.bot).size}** Aktif`,true)
.addField(`**💬 Kanallar [${message.guild.channels.size}]**`,`**📝 ${message.guild.channels.filter(m => m.type === 'text').size}**` + ' Yazı **|** '+ `** 🔊 ${message.guild.channels.filter(m => m.type === 'voice').size}** Ses **|**` + ` 📋 **${message.guild.channels.filter(c => c.type === "category").size}** Kategori`,true)
.addField(`**:mag_right: Roller [${message.guild.roles.size}]**`,`Tüm rolleri görmek için **${pref}roller** yazın.`,true)
.addField('**:star: Emojiler ['+message.guild.emojis.size+']**', `Tüm emojileri görmek için **${pref}emojiler** yazın.`, true)
.addField("**🌍 Diğer **" , `**Bölge:** ${konum}\n**Doğrulama seviyesi:** ${message.guild.verificationLevel}`,true)
.addField(`**💤 AFK Kanalı**`, `${message.guild.afkChannel ? message.guild.afkChannel : 'Bulunmuyor.'}`, true)
.setColor('#000000')
message.channel.send(embed)
  };
   
exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['sunucu','discord','scbilgi','server'],
  kategori: "sunucu",
  permLevel: 0
};

exports.help = {
  name: 'sunucu',
  description: 'Sunucu ile ilgili bilgi verir.',
  usage: 'sunucu' 
}