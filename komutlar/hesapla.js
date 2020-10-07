const Discord = require('discord.js');
const math = require('math-expression-evaluator')
const stripIndents = require('common-tags').stripIndents
const db = require('quick.db')

exports.run = function(client, message, args) {
    let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";

    var soru = args.join(' ');
    
    if(!soru) return message.reply(`Bir işlem belirtin. Doğru Kullanım: ${pref}hesapla <işlem>`)
    else { let cevap;
        try {
            cevap = math.eval(soru)
        } catch(err) {
            message.channel.send('Hatalı işlem: **' + err)
        }

        const embed = new Discord.RichEmbed()
        .setAuthor('Matematik Hesaplaması')
        .addField('Soru', soru)
        .addField('Cevap', cevap)
.setFooter(`${message.author.tag} Tarafından yapıldı`)
        .setTimestamp()
        message.channel.send(embed)
    }

};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['hesaplama',"hesaplamayap","math"],
  kategori:"kullanıcı",
  permLevel: 0 
};

exports.help = {
  name: 'hesapla', 
  description: 'Belirtilen işlemi yapar.',
  usage: 'hesapla <işlem>'
};