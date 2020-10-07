const Discord = require('discord.js');

exports.run = (client, message) => {
  message.react("✅")
    return message.author.send(`**Unus**'un bütün özelliklerine erişebilmek için ücretsiz premium nasıl alınır?\n\n**1 -** **Unus**'un [Destek Sunucusuna](https://discord.gg/E4Q2HsB) Giriniz.\n**2 -** **pRx#3889(385001389119504384)**'i bulup ücretsiz premium istediğinizi belirtip **sunucu id'nizi**||(Sunucu ismi -> sağ tık -> sunucu idsini kopyala)|| atınız.\n**3 -** Ve bu kadar. Ücretsiz premiumunuz **kısa bir zaman içerisinde** sunucunuza verilecektir.\n**:x: ÖNEMLİ NOT:** Ücretsiz premiumu **sınırsız kullanabilmek için destek sunucusundan ayrılmamanız gerekmektedir**. Ayrıldığınız tespit edildiği zaman premiumunuz **otomatikmen silinecektir**.`)
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["premiumbilgi","premiumhakkındabilgi","nasılpremiumalınır","ücretsizpremium","bedavapremium"],
  kategori: "bot",
  permLevel: 0
};

module.exports.help = {
  name: 'premium',
  description: 'Premium hakkında bilgi verir.',
  usage: 'premium'
};