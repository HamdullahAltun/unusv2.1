const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  if(!message.member.hasPermission("ADMINISTRATOR")){
    message.delete()
    message.channel.send(`Yeterli yetkiniz yok! **(Yönetici)**`).then(message => message.delete(5000))
    return;
  }
  let pref = (db.fetch(`prefix.${message.guild.id}`)) || "*";
  if (db.has(`premium_${message.guild.id}`) == false) {
    message.channel.send(`<@${message.author.id}> Maalesef Premium Sunucunuzda Aktif Değildir. Ücretsiz Aktivasyon İçin \`${pref}premium\``)
  } else {
  
  let mesaj = args.slice(0).join(' ');
  if(mesaj.length < 5) return message.channel.send('Lütfen geçerli bir mesaj belirtiniz. `Örnek: '+ `${pref}`+'sayaç-bb-msj -uye-, Sunucumuzdan Ayrıldı, -hedefuye- Kişiye Ulaşabilmek İçin -kalanuye- Kişi Kaldı. **-uyesayisi-** Kişiyiz.`')
  
 message.channel.send('Sayaç Görüşürüz mesajı `'+mesaj+'` olarak ayarlandı!') 
 db.set(`sayacBB_${message.guild.id}`, mesaj)  
    
  }
  
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["sayaçbbmsj","sayacbbmsj","sayac-bb-msj","sayaççıkışmesaj","sayaçbbmesaj"], 
  kategori:"sayaç",
  permLevel: 3
};

exports.help = {
  name: 'sayaç-bb-msj',
  description: 'Sayaç görüşürüz mesajını ayarlar.', 
  usage: 'sayaç-bb-msj -uye-, Sunucumuzdan Ayrıldı, -hedefuye- Kişiye Ulaşabilmek İçin -kalanuye- Kişi Kaldı. -uyesayisi- Kişiyiz.'
};
