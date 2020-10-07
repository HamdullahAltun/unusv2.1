 const Discord = require('discord.js');

const cevaplar = [
  "Evet.", 
    "Hayır.", 
    "Muhtemelen.", 
    "İmkansız.", 
    "Ne yazık ki hayır.", 
    "Maalesef.", 
    "Tabii ki.", 
    "Belki de.", 
    "Şimdi söylemeyeceğim.", 
  "Odaklan ve tekrar sor.",
  'Bu kesin.',
 'Kesinlikle öyle.',
    'Kuşkusuz.',
   'Evet, Kesinlikle.',
   'Buna güvenebilirsin.',
   'Gördüğüm kadarıyla, Evet.',
   'Büyük olasılıkla.',
  'Görünüşe göre, iyi.',
    'İşaretler eveti gösteriyor.',
  'Daha sonra sor.',
   'Şimdi söylemesen iyi olur.',
    'Tahmin edemiyorum...',
    'Konsantre ol ve tekrar sor.',
   'Buna güvenme.',
   'Cevabım, hayır.',
   'Kaynaklarım hayır diyor.',
  'Görünüşe göre, bu iyi değil.',
  'Çok şüpheli.',
  'Şüpheli.',
  'Büyük olasılıkla, hayır.',
  'İçgüdüm, hayır diyor.',
     'Kararsız kaldım, bidaha sormaya ne dersin?'   
];
exports.run = function(client, message, args) {
    var soru = args.join(' ');
    var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];
if(!soru) return message.channel.send('Lütfen sihirli küreye sormak istediğiniz soruyu yazınız.')
    else message.reply(cevap)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['magicball','sihirlitop','sihirliküre',"8top"],
  kategori: "eğlence",
    permLevel: 0
  };  
  exports.help = {
    name: 'sihirli-küre',
    description: 'Sihirli Küreye Soru Sorarsınız.',
    usage: 'sihirli-küre ben zeki miyim'
  };
