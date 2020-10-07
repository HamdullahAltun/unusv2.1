  const Discord = require('discord.js');
const client = new Discord.Client()
const ayarlar = require('./ayarlar.json');
const db = require('quick.db');
const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment');
const Jimp = require('jimp');
const Canvas = require('canvas');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
///////////////////////////////
require("./modules/functions.js")(client);
client.ayar = db;

client.ayarlar = {
  prefix: "*",
  sahip: "385001389119504384"
};

client.on('ready', async () => {
  
  client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);
  
  require("./modules/dashboard.js")(client); 
  
  console.log('> Unus Bot Aktif')
  console.log("¯\_(ツ)_/¯")
    client.user.setStatus("idle");
  client.user.setActivity(`unus.tk | *yardım | *davet`); 
})

//////////////////////////////

client.on("message", async message => {
if(message.channel.type === 'dm') return;
if(message.author.bot) return;
  let pref = (await db.fetch(`prefix.${message.guild.id}`))
  if (pref == null) pref = '*';
  if (message.content === "<@!708316705520091136>") {
      message.channel.send(
        `Prefixim: \`${pref}\`\nEğer yardım istiyorsan **${pref}yardım** veya destek sunucuma gel! https://discord.gg/E4Q2HsB`
      );
    }
});

////snipe////

client.on('messageDelete', async message => {
	  const snipedb = db.fetch(`snipesistemi_${message.guild.id}`)
  if (!snipedb) return
db.set(`unus.silinenmesaj_${message.channel.id}`, { kanal: message.channel.id, mesaj: message.content, sahip: message.author.id, tarih: message.createdAt })
})

////////eklendiçıkarıldı//////////

client.on('guildCreate', guild => {
  const owner = guild.owner
  const mrb = guild.defaultChannel
  if (!mrb) return;
  let merhaba = new Discord.RichEmbed()
  .setColor('BLUE')
  .setAuthor(guild.name, guild.iconURL)
  .setDescription(`Unus Bot'u Eklediğiniz İçin Teşekkürler.`)
  .addField(`**Unus'un** özelliklerini öğrenmek için`, `***yardım** yazmanız yeterlidir!`)
  .addField(`**Bedava premium için**`, `[destek sunucuma](https://discord.gg/E4Q2HsB) gelip **pRx#3889(<@!385001389119504384>)** ile görüşünüz.`)
  .addField("» Linkler", `[DBL Oyver](https://top.gg/bot/708316705520091136/vote)\n[Destek Sunucusu](https://discord.gg/E4Q2HsB)\n[Web Site](https://unus.tk)`)
  .setTimestamp()
  .setThumbnail(client.user.avatarURL)
  guild.owner.send(merhaba)
})

client.on('guildCreate', guild => {
  const embed = new Discord.RichEmbed()
  .setColor('GREEN')
  .setTitle('Unus Bir Sunucuya Eklendi!')
  .setDescription(`Unus, **》${guild.name}《** adlı sunucuya katıldı. Bu sunucu toplam **${guild.memberCount}** Üye!`)
  .addField(':envelope: Katınılıan **Sunucu** Bilgileri', `• **Sunucu Adı:** ${guild.name}\n• **Sunucu ID:** ${guild.id}\n• **Sunucu Sahibi**: ${guild.owner.user.tag}(<@!${guild.owner.id}>)`)
  .setFooter('Unus', client.user.avatarURL)
  .setTimestamp()
  .setThumbnail(client.user.avatarURL)
  client.channels.get('733624813863829576').send(embed);
})

client.on('guildDelete', guild => {
  const embed = new Discord.RichEmbed()
  .setColor('RED')
  .setTitle('Unus Bir Sunucudan Çıkarıldı!')
  .setDescription(`Unus, **》${guild.name}《** adlı sunucudan çıkarıldı. Bu sunucu toplam **${guild.memberCount}** Üye idi!`)
  .addField(':envelope: Çıkarılan **Sunucu** Bilgileri', `• **Sunucu Adı:** ${guild.name}\n• **Sunucu ID:** ${guild.id}\n• **Sunucu Sahibi**: ${guild.owner.user.tag}(<@!${guild.owner.id}>)`)
  .setFooter('Unus', client.user.avatarURL)
  .setTimestamp()
  .setThumbnail(client.user.avatarURL)
  client.channels.get('733624813863829576').send(embed)
})

// otoselam //

client.on('message', async message => {
  if(message.author.bot || !message.guild) return;
  let kontrol = db.fetch(`otoselam_${message.guild.id}`)
  if(!kontrol) return;
  if(message.content.toLowerCase() == 'sa' || message.content.toLowerCase() == 's.a' || message.content.toLowerCase() == 's.a.' || message.content.toLowerCase() == 'selamun aleyküm' || message.content.toLowerCase() == 'selamün aleyküm' || message.content.toLowerCase() == 'selamın aleyküm' || message.content.toLowerCase() == 'selamın aleykum' || message.content.toLowerCase() == 'selamün aleykum' || message.content.toLowerCase() == 'sea' || message.content.toLowerCase() == 'selam' || message.content.toLowerCase() === 'selamlar') {
  await message.channel.send(`Aleyküm Selam, Hoş Geldin ${message.author}!`)
  }
  if (message.content.toLowerCase() === 'merhaba' || message.content.toLowerCase() === 'merhabalar') {
    await message.channel.send(`Sanada Merhaba ${message.author}`)
    }
  if (message.content.toLowerCase() === 'günaydın' || message.content.toLowerCase() === 'günaydınlar') {
      await message.channel.send(`Sanada Günaydın ${message.author}`)
      }
  if (message.content.toLowerCase() === 'iyigeceler' || message.content.toLowerCase() === 'iyi geceler' || message.content.toLowerCase() === 'iigcler' || message.content.toLowerCase() === 'ii gcler') {
        await message.channel.send(`İyi Geceler ${message.author}`)
        }
  if (message.content.toLowerCase() === 'nabıyon') {
          message.channel.send(`seni`).then(message => message.delete(3000));
   }
 if (message.content.toLowerCase() === 'aferin') {
    message.channel.send(`Eyw abw`).then(message => message.delete(3000));
}
if (message.content.toLowerCase() === 'nabıyonlawn') {
  message.channel.send(`Kölelik abw`).then(message => message.delete(3000));
}
if (message.content.toLowerCase() === 'gelemem') {
  message.channel.send(`Çapı küçük kalçalara gelemem `).then(message => message.delete(3000));
}
if (message.content.toLowerCase() === 'köle') {
  message.channel.send(`Efendim ${message.author} abw`).then(message => message.delete(3000));
}
if (message.content.toLowerCase() === 'ipne köle') {
  message.channel.send(`hE ayb`).then(message => message.delete(3000));
}
  })
////////hgbb//////////////////////


client.on('guildMemberAdd', async (member, guild, msg, args) => {
   let user = client.users.get(member.id);
    const resim1 = `<a:dikkat:685171462604455979> **Güvensiz**`
    const resim2 = `<a:dogrulandi:685171502672642084> **Güvenli**`
    const kurulus = new Date() - user.createdAt;
    const gün = moment(kurulus).format('dddd');  
    var kontrol;
    if (kurulus > 2629800000) kontrol = resim2
    if (kurulus < 2629800000) kontrol = resim1

        let katilma = moment(member.user.createdAt).format("DD MMMM YYYY, dddd")

        .replace("Monday", `**Pazartesi**`)
        .replace("Tuesday", `**Salı**`)
        .replace("Wednesday", `**Çarşamba**`)
        .replace("Thursday", `**Perşembe**`)
        .replace("Friday", `**Cuma**`)
        .replace("Saturday", `**Cumartesi**`)
        .replace("Sunday", `**Pazar**`)

        .replace("January", `**Ocak**`)
        .replace("February", `**Şubat**`)
        .replace("March", `**Mart**`)
        .replace("April", `**Nisan**`)
        .replace("May", `**Mayıs**`)
        .replace("June", `**Haziran**`)
        .replace("July", `**Temmuz**`)
        .replace("August", `**Ağustos**`)
        .replace("September", `**Eylül**`)
        .replace("October", `**Ekim**`)
        .replace("November", `**Kasım**`)
        .replace("December", `**Aralık**`)
      
    let hgbbkanal = await db.fetch(`hgbbkanal_${member.guild.id}`)
    let id = member.id
    const emoji = (client.emojis.find(r => r.name === "sagtarafanimasyon").toString())
    const siren = (client.emojis.find(r => r.name === "siren").toString())
    const dogrulandi = (client.emojis.find(r => r.name === "dogrulandi").toString())
    const dikkat = (client.emojis.find(r => r.name === "dikkat").toString()) 
    if (!hgbbkanal) return

    var embed = new Discord.RichEmbed()
        .setAuthor(`Sunucumuza Hoşgeldin, ${member.user.username}`)
        .setDescription(`${emoji} Seninle Birlikte **${member.guild.memberCount}** Kişi Olduk!`)
        .addField(`<a:giris:685171347529269309> Katılan Kişi:`,`<@${id}>`)
        .addField(`<a:yukleniyor:685173227194155016> ID:`, `**${id}**`)
        .addField(`<a:yukleniyor:685173227194155016> Discord'a Katılım Tarihi`, katilma)
        .addField(`<a:yukleniyor:685173227194155016> Güven Faktörü`, kontrol)
        .setThumbnail(member.user.avatarURL)
        .setFooter(member.guild.name, member.guild.iconURL)
     .setTimestamp()
        .setColor('GREEN') 
    member.guild.channels.get(hgbbkanal).send(embed)
})

client.on('guildMemberRemove', async (member, guild, msg, args) => {
       
       let katilma = moment.utc(member.user.joinedAt).format('**YYYY** [Yılında] MMMM [Ayında] dddd [Gününde] (**DD/MM/YYYY**)')

        .replace("Monday", `**Pazartesi**`)
        .replace("Tuesday", `**Salı**`)
        .replace("Wednesday", `**Çarşamba**`)
        .replace("Thursday", `**Perşembe**`)
        .replace("Friday", `**Cuma**`)
        .replace("Saturday", `**Cumartesi**`)
        .replace("Sunday", `**Pazar**`)

        .replace("January", `**Ocak**`)
        .replace("February", `**Şubat**`)
        .replace("March", `**Mart**`)
        .replace("April", `**Nisan**`)
        .replace("May", `**Mayıs**`)
        .replace("June", `**Haziran**`)
        .replace("July", `**Temmuz**`)
        .replace("August", `**Ağustos**`)
        .replace("September", `**Eylül**`)
        .replace("October", `**Ekim**`)
        .replace("November", `**Kasım**`)
        .replace("December", `**Aralık**`)
      
    let hgbbkanal = await db.fetch(`hgbbkanal_${member.guild.id}`)
    let id = member.id
    const emoji = (client.emojis.find(e => e.name === "sagtarafanimasyon").toString())
    if (!hgbbkanal) return

    var embed = new Discord.RichEmbed()
        .setAuthor(`Görüşürüz, ${member.user.username}`)
        .setDescription(`${emoji} Çıkan Kişiyle Birlikte **${member.guild.memberCount}** kişi kaldık!`)
        .addField(`<a:cikis:685171415720132665> Ayrılan Kişi:`,`**${member.user.tag}**`)
        .addField(`<a:dikkat:685171462604455979> ID:`, `**${id}**`)
        .setThumbnail(member.user.avatarURL)
    .setFooter(member.guild.name, member.guild.iconURL)
     .setTimestamp()
    member.guild.channels.get(hgbbkanal).send(embed)
})


//// resimli giriş çıkış ///////////

client.on("guildMemberRemove", async member => {
  
  let resimkanal = db.get(`resimlihgbb_${member.guild.id}`)
  const canvaskanal = member.guild.channels.find(kanal => kanal.id === resimkanal);
  if (!canvaskanal) return;
 
  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");
 
  var randomMsg = ["Sunucudan Ayrıldı.", "Aramızdan Uçtu Gitti", "Güle Güle", "Görüşürüz", "Üzdün Bizi"];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];
 
  let msj = await db.fetch(`resimliCikisM_${member.guild.id}`);
  if (!msj) msj = `-uye-, ${randomMsg_integer}`;
 
  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");
 
  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/BtDz8H.png"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
 
  ctx.strokeStyle = "#ffd800";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
 
  ctx.fillStyle = `#ffd800`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);
 
  let avatarURL = member.user.avatarURL || member.user.defaultAvatarURL;
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);
 
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);
 
  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "unus-gulegule.png"
  );
 
    canvaskanal.send(attachment);
    canvaskanal.send(
      msj.replace("-uye-", member).replace("-sunucu-", member.guild.name).replace("-uyesayisi-", member.guild.memberCount)
    );
    if (member.user.bot)
      return canvaskanal.send(`Bir bot daha geldi, Merhaba ${member.user.username}`);
 
})
 
client.on("guildMemberAdd", async member => {
  let resimkanal = db.get(`resimlihgbb_${member.guild.id}`)
  const canvaskanal = member.guild.channels.find(kanal => kanal.id === resimkanal);
  
  if (!canvaskanal) return;
  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");
 
  var randomMsg = ["Sunucuya Katıldı.","Hoş Geldin", "Merhabalar"];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];
 
  let paket = await db.fetch(`pakets_${member.id}`);
  let msj = await db.fetch(`resimliGirisM_${member.guild.id}`);
  if (!msj) msj = `-uye-, ${randomMsg_integer}`;
 
  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");
 
  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/9cmSWn.png"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
 
  ctx.strokeStyle = "#ffd800";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `#ffd800`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);
 
  let avatarURL = member.user.avatarURL || member.user.defaultAvatarURL;
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);
 
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);
 
  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "unus-hosgeldin.png"
  );
 
  canvaskanal.send(attachment);
  canvaskanal.send(
    msj.replace("-uye-", member).replace("-sunucu-", member.guild.name).replace("-uyesayisi-", member.guild.memberCount)
  );
  if (member.user.bot)
    return canvaskanal.send(`Bir bot daha geldi, Merhaba ${member.user.username}`);
})

/////////otorol////////////////////
client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`otoRK_${member.guild.id}`);
  let rol = await db.fetch(`otoRL_${member.guild.id}`);
  let mesaj = db.fetch(`otoRM_${member.guild.id}`);
  if (!kanal) return
  if(kanal){

  if (!mesaj) {
    client.channels.get(kanal).send(":loudspeaker: :inbox_tray: Otomatik Rol Verildi Seninle Beraber `" + member.guild.memberCount + "` Kişiyiz! Hoşgeldin! `" + member.user.username + "`");
  }

  if (mesaj) {
    var mesajs = mesaj.replace("-uye-", `${member.user}`).replace("-uyetag-", `${member.user.tag}`).replace("-rol-", `${member.guild.roles.get(rol).name}`).replace("-server-", `${member.guild.name}`).replace("-uyesayisi-", `${member.guild.memberCount}`).replace("-botsayisi-", `${member.guild.members.filter(m => m.user.bot).size}`).replace("-bolge-", `${member.guild.region}`).replace("-kanalsayisi-", `${member.guild.channels.size}`);
    return client.channels.get(kanal).send(mesajs);
     }}
});

// otorol panel
client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`otoRL_${member.guild.id}`);
  if (!rol) return
  if(rol){
    member.addRole(rol);
  }
});


////////sayaç ////////
client.on("guildMemberAdd", async member => {
  const kanal = await db.fetch(`sayacK_${member.guild.id}`);
  if (!kanal) return;
  const sayaç = await db.fetch(`sayacS_${member.guild.id}`);
    const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayacHG_${member.guild.id}`)

  if (!mesaj) {
    return client.channels.get(kanal).send(":loudspeaker: :inbox_tray: Kullanıcı Katıldı! `" + sayaç + "` Kişi Olmamıza `" + sonuç + "` Kişi Kaldı `" + member.guild.memberCount + "` Kişiyiz!" + " `" + member.user.username + "`");
  }

  if (member.guild.memberCount == sayaç) {
    return client.channels.get(kanal).send(`:loudspeaker: **Tebrikler!** Sayaç hedefimize ulaştık! Toplamda \`${member.guild.memberCount}\` Kişiyiz! :fire:`)
    await db.delete(`sayacK_${member.guild.id}`)
    await db.delete(`sayacS_${member.guild.id}`)
  }
  if (mesaj) {
    const mesaj31 = mesaj.replace("-uyetag-", `${member.user.tag}`).replace("-uye-", `${member.user.username}`).replace("-server-", `${member.guild.name}`).replace("-uyesayisi-", `${member.guild.memberCount}`).replace("-botsayisi-", `${member.guild.members.filter(m => m.user.bot).size}`).replace("-bolge-", `${member.guild.region}`).replace("-kanalsayisi-", `${member.guild.channels.size}`).replace("-kalanuye-", `${sonuç}`).replace("-hedefuye-", `${sayaç}`)
    return client.channels.get(kanal).send(mesaj31);
  }
});

client.on("guildMemberRemove", async member => {

  const kanal = await db.fetch(`sayacK_${member.guild.id}`);
  const sayaç = await db.fetch(`sayacS_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayacBB_${member.guild.id}`)
  if (!kanal) return;
  if (!sayaç) return;

  if (!mesaj) {
    return client.channels.get(kanal).send(":loudspeaker: :outbox_tray: Kullanıcı Ayrıldı. `" + sayaç + "` Kişi Olmamıza `" + sonuç + "` Kişi Kaldı `" + member.guild.memberCount + "` Kişiyiz!" + " `" + member.user.username + "`");
      }

  if (mesaj) {
    const mesaj31 = mesaj.replace("-uyetag-", `${member.user.tag}`).replace("-uye", `${member.user.username}`).replace("-server-", `${member.guild.name}`).replace("-uyesayisi-", `${member.guild.memberCount}`).replace("-botsayisi-", `${member.guild.members.filter(m => m.user.bot).size}`).replace("-bolge-", `${member.guild.region}`).replace("-kanalsayisi-", `${member.guild.channels.size}`).replace("-kalanuye-", `${sonuç}`).replace("-hedefuye-", `${sayaç}`)
    return client.channels.get(kanal).send(mesaj31);
  }
});

//kayıt isim sistemi/////////////

client.on("guildMemberAdd", async member => {
  let prefix = await db.fetch(`prefix.${member.guild.id}`) || "*";
  let kanal = await db.fetch(`kayitKanal_${member.guild.id}`);
    let mesaj = db.fetch(`kayitGM_${member.guild.id}`);
  if (!kanal) return;

  if (!mesaj) {
    client.channels.get(kanal).send(":loudspeaker: :inbox_tray: Selam! `"+ member.user.username +"`" `${prefix}kayıtol yazarak kayıt olabilirsin!`);
    
  }

  if (mesaj) {
    var mesajs = mesaj.replace("-uye-", `${member.user.username}`).replace("-uyetag-", `${member.user.tag}`).replace("-prefix-",`${prefix}`);
    return client.channels.get(kanal).send(mesajs);
     }
});
////////  OTO TAG //////////////////////////
client.on("guildMemberAdd", async member => {
let kontrol = await db.fetch(`ototag_${member.guild.id}`)
if(!kontrol) return
if (member.bot === true) return;

 var sonuc = await db.fetch(`ototag_${member.guild.id}`).replace("-uye-", `${member.user.username}`) 
 member.setNickname(sonuc);
 
 })

////afk ////////////////////////////////////
client.on("message", message => {
  
    let afk_kullanici = message.mentions.users.first() || message.author;
  
 if (message.author.bot === true) return;
   

     if(message.content.includes(`<@${afk_kullanici.id}>`))
         if(db.has(`afks_${afk_kullanici.id}`)) {
                     message.reply(`**${client.users.get(afk_kullanici.id).tag}** adlı kullanıcı şuanda AFK! \n**Sebep:** ${db.fetch(`afks_${afk_kullanici.id}`)}`)
         }
   
         if(db.has(`afks_${message.author.id}`)) {
                message.channel.send(`**Tekrardan Hoş Geldin, **<@${message.author.id}>`)
             db.delete(`afks_${message.author.id}`)
         } 

       });

//////////////link reklam küfür engel ////////////////////////////////////////////

client.on("message", msg => {
  const reklama = db.fetch(`linkK_${msg.channel.id}`)
  if (!reklama) return
  var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    if (regex.test(msg.content) == true) {
    if (msg.member.hasPermission("MANAGE_MESSAGES")) {
      return;
    }
   msg.delete()
  }
})

client.on("message", msg => {
  const reklama = db.fetch(`reklamK_${msg.channel.id}`)
  if (!reklama) return
    const kelime = ["discord.gg", "discord.me", "discord.io", "discord.tk"];
  if (kelime.some(reklam => msg.content.includes(reklam))) {
    if (msg.member.hasPermission("MANAGE_MESSAGES")) {
      return;
    }
   msg.delete()
  }
})

client.on("message", async msg => {
  if(msg.author.bot) return;
  if(msg.channel.type === "dm") return;
  let i = await db.fetch(`küfürE_${msg.channel.id}`)
  if (i == 'aktif') {
      const kufur = ["abaza","abazan","aq","ağzınasıçayım","ahmak","amarım","ambiti","ambiti","amcığı","amcığın","amcığını","amcığınızı","amcık","amcıkhoşafı","amcıklama","amcıklandı","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","amık","amına","amınako","amınakoy","amınakoyarım","amınakoyayım","amınakoyim","amınakoyyim","amınas","amınasikem","amınasokam","amınferyadı","amını","amınıs","amınoglu","amınoğlu","amınoğli","amısına","amısını","amina","aminakoyarim","aminakoyayım","aminakoyayim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","aminoglu","amiyum","amk","amkafa","amkçocuğu","amlarnzn","amlı","amm","amna","amnda","amndaki","amngtn","amnn","amq","amsız","amsiz","amuna","ana","anaaann","anal","anan","anana","anandan","ananı","ananı","ananın","ananınam","ananınamı","ananındölü","ananınki","ananısikerim","ananısikerim","ananısikeyim","ananısikeyim","ananızın","ananızınam","anani","ananin","ananisikerim","ananisikerim","ananisikeyim","ananisikeyim","anann","ananz","anas","anasını","anasınınam","anasıorospu","anasi","anasinin","angut","anneni","annenin","annesiz","aptal","aq","a.q","a.q.","aq.","atkafası","atmık","avrat","babaannesikaşar","babanı","babanın","babani","babasıpezevenk","bacına","bacını","bacının","bacini","bacn","bacndan","bitch","bok","boka","bokbok","bokça","bokkkumu","boklar","boktan","boku","bokubokuna","bokum","bombok","boner","bosalmak","boşalmak","çük","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dinsiz","dkerim","domal","domalan","domaldı","domaldın","domalık","domalıyor","domalmak","domalmış","domalsın","domalt","domaltarak","domaltıp","domaltır","domaltırım","domaltip","domaltmak","dölü","eben","ebeni","ebenin","ebeninki","ecdadını","ecdadini","embesil","fahise","fahişe","feriştah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","geber","geberik","gebermek","gebermiş","gebertir","gerızekalı","gerizekalı","gerizekali","gerzek","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotune","gotunu","gotveren","göt","götdeliği","götherif","götlalesi","götlek","götoğlanı","götoğlanı","götoş","götten","götü","götün","götüne","götünekoyim","götünekoyim","götünü","götveren","götveren","götverir","gtveren","hasiktir","hassikome","hassiktir","hassiktir","hassittir","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnesi","ipne","itoğluit","kahpe","kahpenin","kaka","kaltak","kancık","kancik","kappe","kavat","kavatn","kocagöt","koduğmunun","kodumun","kodumunun","koduumun","mal","malafat","malak","manyak","meme","memelerini","oc","ocuu","ocuun","0Ç","o.çocuğu","orosbucocuu","orospu","orospucocugu","orospuçoc","orospuçocuğu","orospuçocuğudur","orospuçocukları","orospudur","orospular","orospunun","orospununevladı","orospuydu","orospuyuz","orrospu","oruspu","oruspuçocuğu","oruspuçocuğu","osbir","öküz","penis","pezevek","pezeven","pezeveng","pezevengi","pezevenginevladı","pezevenk","pezo","pic","pici","picler","piç","piçinoğlu","piçkurusu","piçler","pipi","pisliktir","porno","pussy","puşt","puşttur","s1kerim","s1kerm","s1krm","sakso","salaak","salak","serefsiz","sexs","sıçarım","sıçtığım","sıkecem","sicarsin","sie","sik","sikdi","sikdiğim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikey","sikeydim","sikeyim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmiş","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","sikiş","sikişen","sikişme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinler","siksiz","siksok","siksz","sikti","siktigimin","siktigiminin","siktiğim","siktiğimin","siktiğiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktimin","siktiminin","siktir","siktiret","siktirgit","siktirgit","siktirir","siktiririm","siktiriyor","siktirlan","siktirolgit","sittimin","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokam","sokarım","sokarim","sokarm","sokarmkoduumun","sokayım","sokaym","sokiim","soktuğumunun","sokuk","sokum","sokuş","sokuyum","soxum","sulaleni","sülalenizi","tasak","tassak","taşak","taşşak","s.k","s.keyim","vajina","vajinanı","xikeyim","yaaraaa","yalarım","yalarun","orospi","orospinin","orospının","orospı","yaraaam","yarak","yaraksız","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraamı","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarrağ","yarrağım","yarrağımı","yarraimin","yarrak","yarram","yarramin","yarraminbaşı","yarramn","yarran","yarrana","yarrrak","yavak","yavş","yavşak","yavşaktır","yrrak","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiin","ağzına","mk","amcık","amcıkağız","amcıkları","amık","amın","amına","amınakoyim","amınoğlu","amina","amini","amk","amq","anan","ananı","ananızı","ananizi","aminizi","aminii","avradını","avradini","anasını","b.k","bok","boktan","boşluk","dalyarak","dasak","dassak","daşak","daşşak","daşşaksız","durum","ensest","erotik","fahişe","fuck","g*t","g*tü","g*tün","g*tüne","g.t","gavat","gay","gerızekalıdır","gerizekalı","gerizekalıdır","got","gotunu","gotuze","göt","götü","götüne","götünü","götünüze","götüyle","götveren","götvern","guat","hasiktir","hasiktr","hastir","i.ne","ibne","ibneler","ibneliği","ipne","ipneler","it","iti","itler","kavat","kıç","kıro","kromusunuz","kromusunuz","lezle","lezler","nah","o.ç","oç.","okuz","orosbu","orospu","orospucocugu","orospular","otusbir","otuzbir","öküz","penis","pezevenk","pezevenkler","pezo","pic","piç","piçi","piçinin","piçler","pis","pok","pokunu","porn","porno","puşt","sex","s.tir","sakso","salak","sanane","sanane","sçkik","seks","serefsiz","serefsz","serefszler","sex","sıçmak","sıkerım","sıkm","sıktır","si.çmak","sicmak","sicti","sik","sikenin","siker","sikerim","sikerler","sikert","sikertirler","sikertmek","sikeyim","sikicem","sikiim","sikik","sikim","sikime","sikimi","sikiş","sikişken","sikişmek","sikm","sikmeyi","siksinler","siktiğim","siktimin","siktin","siktirgit","siktir","siktirgit","siktirsin","siqem","skiym","skm","skrm","sktim","sktir","sktirsin","sktr","sktroradan","sktrsn","snane","sokacak","sokarim","sokayım","sülaleni","şerefsiz","şerefsizler","şerefsizlerin","şerefsizlik","tasak","tassak","taşak","taşşak","travesti","yarak","yark","yarrağım","yarrak","yarramın","yarrk","yavşak","yrak","yrk","ebenin","ezik","o.ç.","orospu","öküz","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sperm","bok","aq","a.q.","amk","amına","ebenin","ezik","fahişe","gavat","gavurundölü","gerizekalı","göte","götü","götüne","götünü","lan","mal","o.ç.","orospu","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikilmiş","siktir","sperm","taşak","totoş","yarak","yarrak","bok","aq","a.q.","amk","ebenin","fahişe","gavat","gerizakalı","gerizekalı","göt","göte","götü","götüne","götsün","piçsin","götsünüz","piçsiniz","götünüze","kıçınız","kıçınıza","götünü","hayvan","ibne","ipne","kahpe","kaltak","lan","mal","o.c","oc","manyak","o.ç.","oç","orospu","öküz","pezevenk","piç","puşt","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikiim","siktim","siki","sikilmiş","siktir","siktir","sperm","şerefsiz","taşak","totoş","yarak","yarrak","yosma","aq","a.q.","amk","amına","amınakoyim","amina","ammına","amna","sikim","sikiym","sikeyim","siktr","kodumun","amık","sikem","sikim","sikiym","s.iktm","s.ikerim","s.ktir","amg","am.k","a.mk","amık","rakı","rak","oruspu","oc","ananın","ananınki","bacının","bacını","babanın","sike","skim","skem","amcık","şerefsiz","piç","piçinoğlu","amcıkhoşafı","amınasokam","amkçocuğu","amınferyadı","amınoglu","piçler","sikerim","sikeyim","siktiğim","siktiğimin","amını","amına","amınoğlu","amk","ipne","ibne","serefsiz","şerefsiz","piç","piçkurusu","götün","götoş","yarrak","amcik","sıçarım","sıçtığım","aq","a.q","a.q.","aq.","a.g.","ag.","amınak","aminak","amınag","aminag","amınıs","amınas","ananı","babanı","anani","babani","bacını","bacini","ecdadını","ecdadini","sikeyim","sulaleni","sülaleni","dallama","dangalak","aptal","salak","gerızekalı","gerizekali","öküz","angut","dalyarak","sikiyim","sikeyim","götüne","götünü","siktirgit","siktirgit","siktirolgit","siktirolgit","siktir","hasiktir","hassiktir","hassiktir","dalyarak","dalyarrak","kancık","kancik","kaltak","orospu","oruspu","fahişe","fahise","pezevenk","pezo","kocagöt","ambiti","götünekoyim","götünekoyim","amınakoyim","aminakoyim","amınak","aminakoyayım","aminakoyayim","amınakoyarım","aminakoyarim","aminakoyarim","ananısikeyim","ananisikeyim","ananısikeyim","ananisikeyim","ananisikerim","ananısikerim","ananisikerim","ananısikerim","orospucocugu","oruspucocu","amk","amq","sikik","götveren","götveren","amınoğlu","aminoglu","amınoglu","gavat","kavat","anneni","annenin","ananın","ananin","dalyarak","sikik","amcık","siktir","piç","pic","sie","yarram","göt","meme","dildo","skcem","skerm","skerim","skecem","orrospu","annesiz","kahpe","kappe","yarak","yaram","dalaksız","yaraksız","amlı","s1kerim","s1kerm","s1krm","sikim","orospuçocukları", "oç"]
      
      if (kufur.some(word => msg.content.toLowerCase().startsWith(word))) {
          try {
            if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
            msg.delete();       
            }              
          } catch(err) {
            console.log(err);
          }
        }     
    }
    if (!i) return;
    });

client.on("message", async msg => {
  
  if(msg.author.bot) return;
  if(msg.channel.type === "dm") return;
  let i = await db.fetch(`küfürE_${msg.channel.id}`)
  if (i == 'aktif') {
      const kufur = ["abaza","abazan","aq","ağzınasıçayım","ahmak","am","amarım","ambiti","ambiti","amcığı","amcığın","amcığını","amcığınızı","amcık","amcıkhoşafı","amcıklama","amcıklandı","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","amık","amına","amınako","amınakoy","amınakoyarım","amınakoyayım","amınakoyim","amınakoyyim","amınas","amınasikem","amınasokam","amınferyadı","amını","amınıs","amınoglu","amınoğlu","amınoğli","amısına","amısını","amina","aminakoyarim","aminakoyayım","aminakoyayim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","aminoglu","amiyum","amk","amkafa","amkçocuğu","amlarnzn","amlı","amm","amna","amnda","amndaki","amngtn","amnn","amq","amsız","amsiz","amuna","ana","anaaann","anal","anan","anana","anandan","ananı","ananı","ananın","ananınam","ananınamı","ananındölü","ananınki","ananısikerim","ananısikerim","ananısikeyim","ananısikeyim","ananızın","ananızınam","anani","ananin","ananisikerim","ananisikerim","ananisikeyim","ananisikeyim","anann","ananz","anas","anasını","anasınınam","anasıorospu","anasi","anasinin","angut","anneni","annenin","annesiz","aptal","aq","a.q","a.q.","aq.","atkafası","atmık","avrat","babaannesikaşar","babanı","babanın","babani","babasıpezevenk","bacına","bacını","bacının","bacini","bacn","bacndan","bitch","bok","boka","bokbok","bokça","bokkkumu","boklar","boktan","boku","bokubokuna","bokum","bombok","boner","bosalmak","boşalmak","çük","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dinsiz","dkerim","domal","domalan","domaldı","domaldın","domalık","domalıyor","domalmak","domalmış","domalsın","domalt","domaltarak","domaltıp","domaltır","domaltırım","domaltip","domaltmak","dölü","eben","ebeni","ebenin","ebeninki","ecdadını","ecdadini","embesil","fahise","fahişe","feriştah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","geber","geberik","gebermek","gebermiş","gebertir","gerızekalı","gerizekalı","gerizekali","gerzek","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotune","gotunu","gotveren","göt","götdeliği","götherif","götlalesi","götlek","götoğlanı","götoğlanı","götoş","götten","götü","götün","götüne","götünekoyim","götünekoyim","götünü","götveren","götveren","götverir","gtveren","hasiktir","hassikome","hassiktir","hassiktir","hassittir","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnesi","ipne","itoğluit","kahpe","kahpenin","kaka","kaltak","kancık","kancik","kappe","kavat","kavatn","kocagöt","koduğmunun","kodumun","kodumunun","koduumun","mal","malafat","malak","manyak","meme","memelerini","oc","ocuu","ocuun","0Ç","o.çocuğu","orosbucocuu","orospu","orospucocugu","orospuçoc","orospuçocuğu","orospuçocuğudur","orospuçocukları","orospudur","orospular","orospunun","orospununevladı","orospuydu","orospuyuz","orrospu","oruspu","oruspuçocuğu","oruspuçocuğu","osbir","öküz","penis","pezevek","pezeven","pezeveng","pezevengi","pezevenginevladı","pezevenk","pezo","pic","pici","picler","piç","piçinoğlu","piçkurusu","piçler","pipi","pisliktir","porno","pussy","puşt","puşttur","s1kerim","s1kerm","s1krm","sakso","salaak","salak","serefsiz","sexs","sıçarım","sıçtığım","sıkecem","sicarsin","sie","sik","sikdi","sikdiğim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikey","sikeydim","sikeyim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmiş","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","sikiş","sikişen","sikişme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinler","siksiz","siksok","siksz","sikti","siktigimin","siktigiminin","siktiğim","siktiğimin","siktiğiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktimin","siktiminin","siktir","siktiret","siktirgit","siktirgit","siktirir","siktiririm","siktiriyor","siktirlan","siktirolgit","sittimin","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokam","sokarım","sokarim","sokarm","sokarmkoduumun","sokayım","sokaym","sokiim","soktuğumunun","sokuk","sokum","sokuş","sokuyum","soxum","sulaleni","sülalenizi","tasak","tassak","taşak","taşşak","s.k","s.keyim","vajina","vajinanı","xikeyim","yaaraaa","yalarım","yalarun","orospi","orospinin","orospının","orospı","yaraaam","yarak","yaraksız","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraamı","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarrağ","yarrağım","yarrağımı","yarraimin","yarrak","yarram","yarramin","yarraminbaşı","yarramn","yarran","yarrana","yarrrak","yavak","yavş","yavşak","yavşaktır","yrrak","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiin","ağzına","am","mk","amcık","amcıkağız","amcıkları","amık","amın","amına","amınakoyim","amınoğlu","amina","amini","amk","amq","anan","ananı","ananızı","ananizi","aminizi","aminii","avradını","avradini","anasını","b.k","bok","boktan","boşluk","dalyarak","dasak","dassak","daşak","daşşak","daşşaksız","durum","ensest","erotik","fahişe","fuck","g*t","g*tü","g*tün","g*tüne","g.t","gavat","gay","gerızekalıdır","gerizekalı","gerizekalıdır","got","gotunu","gotuze","göt","götü","götüne","götünü","götünüze","götüyle","götveren","götvern","guat","hasiktir","hasiktr","hastir","i.ne","ibne","ibneler","ibneliği","ipne","ipneler","it","iti","itler","kavat","kıç","kıro","kromusunuz","kromusunuz","lezle","lezler","nah","o.ç","oç.","okuz","orosbu","orospu","orospucocugu","orospular","otusbir","otuzbir","öküz","penis","pezevenk","pezevenkler","pezo","pic","piç","piçi","piçinin","piçler","pis","pok","pokunu","porn","porno","puşt","sex","s.tir","sakso","salak","sanane","sanane","sçkik","seks","serefsiz","serefsz","serefszler","sex","sıçmak","sıkerım","sıkm","sıktır","si.çmak","sicmak","sicti","sik","sikenin","siker","sikerim","sikerler","sikert","sikertirler","sikertmek","sikeyim","sikicem","sikiim","sikik","sikim","sikime","sikimi","sikiş","sikişken","sikişmek","sikm","sikmeyi","siksinler","siktiğim","siktimin","siktin","siktirgit","siktir","siktirgit","siktirsin","siqem","skiym","skm","skrm","sktim","sktir","sktirsin","sktr","sktroradan","sktrsn","snane","sokacak","sokarim","sokayım","sülaleni","şerefsiz","şerefsizler","şerefsizlerin","şerefsizlik","tasak","tassak","taşak","taşşak","travesti","yarak","yark","yarrağım","yarrak","yarramın","yarrk","yavşak","yrak","yrk","ebenin","ezik","o.ç.","orospu","öküz","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sperm","bok","aq","a.q.","amk","am","amına","ebenin","ezik","fahişe","gavat","gavurundölü","gerizekalı","göte","götü","götüne","götünü","lan","mal","o.ç.","orospu","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikilmiş","siktir","sperm","taşak","totoş","yarak","yarrak","bok","aq","a.q.","amk","am","ebenin","fahişe","gavat","gerizakalı","gerizekalı","göt","göte","götü","götüne","götsün","piçsin","götsünüz","piçsiniz","götünüze","kıçınız","kıçınıza","götünü","hayvan","ibne","ipne","kahpe","kaltak","lan","mal","o.c","oc","manyak","o.ç.","oç","orospu","öküz","pezevenk","piç","puşt","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikiim","siktim","siki","sikilmiş","siktir","siktir","sperm","şerefsiz","taşak","totoş","yarak","yarrak","yosma","aq","a.q.","amk","amına","amınakoyim","amina","ammına","amna","sikim","sikiym","sikeyim","siktr","kodumun","amık","sikem","sikim","sikiym","s.iktm","s.ikerim","s.ktir","amg","am.k","a.mk","amık","rakı","rak","oruspu","oc","ananın","ananınki","bacının","bacını","babanın","sike","skim","skem","amcık","şerefsiz","piç","piçinoğlu","amcıkhoşafı","amınasokam","amkçocuğu","amınferyadı","amınoglu","piçler","sikerim","sikeyim","siktiğim","siktiğimin","amını","amına","amınoğlu","amk","ipne","ibne","serefsiz","şerefsiz","piç","piçkurusu","götün","götoş","yarrak","amcik","sıçarım","sıçtığım","aq","a.q","a.q.","aq.","a.g.","ag.","amınak","aminak","amınag","aminag","amınıs","amınas","ananı","babanı","anani","babani","bacını","bacini","ecdadını","ecdadini","sikeyim","sulaleni","sülaleni","dallama","dangalak","aptal","salak","gerızekalı","gerizekali","öküz","angut","dalyarak","sikiyim","sikeyim","götüne","götünü","siktirgit","siktirgit","siktirolgit","siktirolgit","siktir","hasiktir","hassiktir","hassiktir","dalyarak","dalyarrak","kancık","kancik","kaltak","orospu","oruspu","fahişe","fahise","pezevenk","pezo","kocagöt","ambiti","götünekoyim","götünekoyim","amınakoyim","aminakoyim","amınak","aminakoyayım","aminakoyayim","amınakoyarım","aminakoyarim","aminakoyarim","ananısikeyim","ananisikeyim","ananısikeyim","ananisikeyim","ananisikerim","ananısikerim","ananisikerim","ananısikerim","orospucocugu","oruspucocu","amk","amq","sikik","götveren","götveren","amınoğlu","aminoglu","amınoglu","gavat","kavat","anneni","annenin","ananın","ananin","dalyarak","sikik","amcık","siktir","piç","pic","sie","yarram","göt","meme","dildo","skcem","skerm","skerim","skecem","orrospu","annesiz","kahpe","kappe","yarak","yaram","dalaksız","yaraksız","amlı","s1kerim","s1kerm","s1krm","sikim","orospuçocukları", "oç"]
      if (msg.content.includes(" ")) {
      if (kufur.some(word => msg.content.toLowerCase().includes(" " + word))) {
          try {
            if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
            msg.delete();      
            }              
          } catch(err) {
            console.log(err);
          }
        }
        } else {
         if (kufur.some(word => msg.content == word)) {
          try {
            if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
                  msg.delete();  
            }              
          } catch(err) {
            console.log(err);
          }
        } 
        }
    }
    
    if (!i) return;
    });

client.on('messageUpdate', async (oldMsg, newMsg) => {  
if (!oldMsg.guild) return;
  if (oldMsg.author.bot) return;
  let i = await db.fetch(`küfürE_${oldMsg.channel.id}`)
  
  if (i == 'aktif') {
      const kufur = ["abaza","abazan","aq","ağzınasıçayım","ahmak","am","amarım","ambiti","ambiti","amcığı","amcığın","amcığını","amcığınızı","amcık","amcıkhoşafı","amcıklama","amcıklandı","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","amık","amına","amınako","amınakoy","amınakoyarım","amınakoyayım","amınakoyim","amınakoyyim","amınas","amınasikem","amınasokam","amınferyadı","amını","amınıs","amınoglu","amınoğlu","amınoğli","amısına","amısını","amina","aminakoyarim","aminakoyayım","aminakoyayim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","aminoglu","amiyum","amk","amkafa","amkçocuğu","amlarnzn","amlı","amm","amna","amnda","amndaki","amngtn","amnn","amq","amsız","amsiz","amuna","ana","anaaann","anal","anan","anana","anandan","ananı","ananı","ananın","ananınam","ananınamı","ananındölü","ananınki","ananısikerim","ananısikerim","ananısikeyim","ananısikeyim","ananızın","ananızınam","anani","ananin","ananisikerim","ananisikerim","ananisikeyim","ananisikeyim","anann","ananz","anas","anasını","anasınınam","anasıorospu","anasi","anasinin","angut","anneni","annenin","annesiz","aptal","aq","a.q","a.q.","aq.","atkafası","atmık","avrat","babaannesikaşar","babanı","babanın","babani","babasıpezevenk","bacına","bacını","bacının","bacini","bacn","bacndan","bitch","bok","boka","bokbok","bokça","bokkkumu","boklar","boktan","boku","bokubokuna","bokum","bombok","boner","bosalmak","boşalmak","çük","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dinsiz","dkerim","domal","domalan","domaldı","domaldın","domalık","domalıyor","domalmak","domalmış","domalsın","domalt","domaltarak","domaltıp","domaltır","domaltırım","domaltip","domaltmak","dölü","eben","ebeni","ebenin","ebeninki","ecdadını","ecdadini","embesil","fahise","fahişe","feriştah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","geber","geberik","gebermek","gebermiş","gebertir","gerızekalı","gerizekalı","gerizekali","gerzek","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotune","gotunu","gotveren","göt","götdeliği","götherif","götlalesi","götlek","götoğlanı","götoğlanı","götoş","götten","götü","götün","götüne","götünekoyim","götünekoyim","götünü","götveren","götveren","götverir","gtveren","hasiktir","hassikome","hassiktir","hassiktir","hassittir","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnesi","ipne","itoğluit","kahpe","kahpenin","kaka","kaltak","kancık","kancik","kappe","kavat","kavatn","kocagöt","koduğmunun","kodumun","kodumunun","koduumun","mal","malafat","malak","manyak","meme","memelerini","oc","ocuu","ocuun","0Ç","o.çocuğu","orosbucocuu","orospu","orospucocugu","orospuçoc","orospuçocuğu","orospuçocuğudur","orospuçocukları","orospudur","orospular","orospunun","orospununevladı","orospuydu","orospuyuz","orrospu","oruspu","oruspuçocuğu","oruspuçocuğu","osbir","öküz","penis","pezevek","pezeven","pezeveng","pezevengi","pezevenginevladı","pezevenk","pezo","pic","pici","picler","piç","piçinoğlu","piçkurusu","piçler","pipi","pisliktir","porno","pussy","puşt","puşttur","s1kerim","s1kerm","s1krm","sakso","salaak","salak","serefsiz","sexs","sıçarım","sıçtığım","sıkecem","sicarsin","sie","sik","sikdi","sikdiğim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikey","sikeydim","sikeyim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmiş","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","sikiş","sikişen","sikişme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinler","siksiz","siksok","siksz","sikti","siktigimin","siktigiminin","siktiğim","siktiğimin","siktiğiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktimin","siktiminin","siktir","siktiret","siktirgit","siktirgit","siktirir","siktiririm","siktiriyor","siktirlan","siktirolgit","sittimin","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokam","sokarım","sokarim","sokarm","sokarmkoduumun","sokayım","sokaym","sokiim","soktuğumunun","sokuk","sokum","sokuş","sokuyum","soxum","sulaleni","sülalenizi","tasak","tassak","taşak","taşşak","s.k","s.keyim","vajina","vajinanı","xikeyim","yaaraaa","yalarım","yalarun","orospi","orospinin","orospının","orospı","yaraaam","yarak","yaraksız","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraamı","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarrağ","yarrağım","yarrağımı","yarraimin","yarrak","yarram","yarramin","yarraminbaşı","yarramn","yarran","yarrana","yarrrak","yavak","yavş","yavşak","yavşaktır","yrrak","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiin","ağzına","am","mk","amcık","amcıkağız","amcıkları","amık","amın","amına","amınakoyim","amınoğlu","amina","amini","amk","amq","anan","ananı","ananızı","ananizi","aminizi","aminii","avradını","avradini","anasını","b.k","bok","boktan","boşluk","dalyarak","dasak","dassak","daşak","daşşak","daşşaksız","durum","ensest","erotik","fahişe","fuck","g*t","g*tü","g*tün","g*tüne","g.t","gavat","gay","gerızekalıdır","gerizekalı","gerizekalıdır","got","gotunu","gotuze","göt","götü","götüne","götünü","götünüze","götüyle","götveren","götvern","guat","hasiktir","hasiktr","hastir","i.ne","ibne","ibneler","ibneliği","ipne","ipneler","it","iti","itler","kavat","kıç","kıro","kromusunuz","kromusunuz","lezle","lezler","nah","o.ç","oç.","okuz","orosbu","orospu","orospucocugu","orospular","otusbir","otuzbir","öküz","penis","pezevenk","pezevenkler","pezo","pic","piç","piçi","piçinin","piçler","pis","pok","pokunu","porn","porno","puşt","sex","s.tir","sakso","salak","sanane","sanane","sçkik","seks","serefsiz","serefsz","serefszler","sex","sıçmak","sıkerım","sıkm","sıktır","si.çmak","sicmak","sicti","sik","sikenin","siker","sikerim","sikerler","sikert","sikertirler","sikertmek","sikeyim","sikicem","sikiim","sikik","sikim","sikime","sikimi","sikiş","sikişken","sikişmek","sikm","sikmeyi","siksinler","siktiğim","siktimin","siktin","siktirgit","siktir","siktirgit","siktirsin","siqem","skiym","skm","skrm","sktim","sktir","sktirsin","sktr","sktroradan","sktrsn","snane","sokacak","sokarim","sokayım","sülaleni","şerefsiz","şerefsizler","şerefsizlerin","şerefsizlik","tasak","tassak","taşak","taşşak","travesti","yarak","yark","yarrağım","yarrak","yarramın","yarrk","yavşak","yrak","yrk","ebenin","ezik","o.ç.","orospu","öküz","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sperm","bok","aq","a.q.","amk","am","amına","ebenin","ezik","fahişe","gavat","gavurundölü","gerizekalı","göte","götü","götüne","götünü","lan","mal","o.ç.","orospu","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikilmiş","siktir","sperm","taşak","totoş","yarak","yarrak","bok","aq","a.q.","amk","am","ebenin","fahişe","gavat","gerizakalı","gerizekalı","göt","göte","götü","götüne","götsün","piçsin","götsünüz","piçsiniz","götünüze","kıçınız","kıçınıza","götünü","hayvan","ibne","ipne","kahpe","kaltak","lan","mal","o.c","oc","manyak","o.ç.","oç","orospu","öküz","pezevenk","piç","puşt","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikiim","siktim","siki","sikilmiş","siktir","siktir","sperm","şerefsiz","taşak","totoş","yarak","yarrak","yosma","aq","a.q.","amk","amına","amınakoyim","amina","ammına","amna","sikim","sikiym","sikeyim","siktr","kodumun","amık","sikem","sikim","sikiym","s.iktm","s.ikerim","s.ktir","amg","am.k","a.mk","amık","rakı","rak","oruspu","oc","ananın","ananınki","bacının","bacını","babanın","sike","skim","skem","amcık","şerefsiz","piç","piçinoğlu","amcıkhoşafı","amınasokam","amkçocuğu","amınferyadı","amınoglu","piçler","sikerim","sikeyim","siktiğim","siktiğimin","amını","amına","amınoğlu","amk","ipne","ibne","serefsiz","şerefsiz","piç","piçkurusu","götün","götoş","yarrak","amcik","sıçarım","sıçtığım","aq","a.q","a.q.","aq.","a.g.","ag.","amınak","aminak","amınag","aminag","amınıs","amınas","ananı","babanı","anani","babani","bacını","bacini","ecdadını","ecdadini","sikeyim","sulaleni","sülaleni","dallama","dangalak","aptal","salak","gerızekalı","gerizekali","öküz","angut","dalyarak","sikiyim","sikeyim","götüne","götünü","siktirgit","siktirgit","siktirolgit","siktirolgit","siktir","hasiktir","hassiktir","hassiktir","dalyarak","dalyarrak","kancık","kancik","kaltak","orospu","oruspu","fahişe","fahise","pezevenk","pezo","kocagöt","ambiti","götünekoyim","götünekoyim","amınakoyim","aminakoyim","amınak","aminakoyayım","aminakoyayim","amınakoyarım","aminakoyarim","aminakoyarim","ananısikeyim","ananisikeyim","ananısikeyim","ananisikeyim","ananisikerim","ananısikerim","ananisikerim","ananısikerim","orospucocugu","oruspucocu","amk","amq","sikik","götveren","götveren","amınoğlu","aminoglu","amınoglu","gavat","kavat","anneni","annenin","ananın","ananin","dalyarak","sikik","amcık","siktir","piç","pic","sie","yarram","göt","meme","dildo","skcem","skerm","skerim","skecem","orrospu","annesiz","kahpe","kappe","yarak","yaram","dalaksız","yaraksız","amlı","s1kerim","s1kerm","s1krm","sikim","orospuçocukları", "oç"]
      if (kufur.some(word => oldMsg.content.toLowerCase().includes(word))) {

      try {
          if (!oldMsg.member.hasPermission("BAN_MEMBERS")) {
              newMsg.delete();
              
    /* 
                  return oldMsg.channel.send(`${oldMsg.author} Ben Zeki Bir Botum Mesajını Editlersende Küfür Edemezsin**!**`).then(msg => msg.delete(3000));*/
          }              
        } catch(err) {
          console.log(err);
        }
      }
  }
  if (!i) return;
});
//modlog ///////////////////////////
client.on('messageDelete', message => {

	if(message.author.bot) return;
	if(message.channel.type === 'dm') return;
	if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;

	let modlogs = db.get(`modlogkanaly_${message.guild.id}`)
  const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return; 
  if (message.content > 2048) return;
  if(modlogs){
  
	let messageDelete = new Discord.RichEmbed()
	.setTitle('**[MESAJ SİLİNDİ]**')
	.setColor('RED')
	.setThumbnail(message.author.avatarURL)
	.setDescription(`**:wastebasket: <@${message.author.id}> Tarafından <#${message.channel.id}> Kanalına Gönderilen Mesaj \`\`SİLİNDİ\`\`**\n**Mesaj ID:** ${message.id}\n**Mesaj:**\n\`\`\`${message}\`\`\``)
	.setTimestamp()
	.setFooter(message.guild.name, message.guild.iconURL)

	modlogkanal.send(messageDelete);
  }
});
client.on('messageUpdate', (oldMessage, newMessage) => {

	if(oldMessage.author.bot) return;
	if(!oldMessage.channel.type === 'dm') return;
	if(!oldMessage.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!oldMessage.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;

	let modlogs = db.get(`modlogkanaly_${oldMessage.guild.id}`)
  const modlogkanal = oldMessage.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs){
if (oldMessage.content > 2048) return;
if (newMessage.content > 2048) return;
	if(oldMessage.content.startsWith('https://')) return;

	let messageUpdate = new Discord.RichEmbed()
	.setTitle('**[MESAJ DÜZENLENDİ]**')
	.setThumbnail(oldMessage.author.avatarURL)
	.setColor('BLUE')
	.setDescription(`**:wrench:<@${oldMessage.author.id}> Tarafından <#${oldMessage.channel.id}> Kanalına Gönderilen Mesaj \`\`DÜZENLENDİ\`\`**\n**Mesaj ID:** ${oldMessage.id}\n**Eski Mesaj:**\`\`\`${oldMessage}\`\`\`\n**Yeni Mesaj:**\`\`\`${newMessage}\`\`\``)
	.setTimestamp()
	.setFooter(oldMessage.guild.name, oldMessage.guild.iconURL)

	modlogkanal.send(messageUpdate);
  }
});


client.on('roleCreate', role => {

	if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	let modlogs = db.get(`modlogkanaly_${role.guild.id}`)
  const modlogkanal = role.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
if(modlogs){
	role.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let roleCreate = new Discord.RichEmbed()
		.setTitle('**[ROL OLUŞTURULDU]**')
		.setThumbnail(userAvatar)
		.setDescription(`:white_check_mark: Yeni Bir Rol \`\`OLUŞTURULDU\`\`\n**Rol İsmi:** \`\`${role.name}\`\` (ID: ${role.id})\n**Oluşturan:** <@${userID}> **(ID: ${userID})**`)
		.setColor('GREEN')
		.setTimestamp()
		.setFooter(role.guild.name, role.guild.iconURL)

		modlogkanal.send(roleCreate);
	})
}
});
client.on('roleDelete', role => {

	if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	let modlogs = db.get(`modlogkanaly_${role.guild.id}`)
  const modlogkanal = role.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
if(modlogs){
	role.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let roleDelete = new Discord.RichEmbed()
		.setTitle('**[ROL SİLİNDİ]**')
		.setThumbnail(userAvatar)
		.setDescription(`:white_check_mark: Rol \`\`SİLİNDİ\`\`\n**Rol İsmi:** \`\`${role.name}\`\` (ID: ${role.id})\n**Silen:** <@${userID}> **(ID: ${userID})**`)
		.setColor('RED')
		.setTimestamp()
		.setFooter(role.guild.name, role.guild.iconURL)

		modlogkanal.send(roleDelete);
	})
}
});
client.on('roleUpdate', (oldRole, newRole) => {

	if(!oldRole.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	let modlogs = db.get(`modlogkanaly_${oldRole.guild.id}`)
  const modlogkanal = oldRole.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
if(modlogs){
	oldRole.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldRole.name !== newRole.name) {
			let roleUpdateName = new Discord.RichEmbed()
			.setTitle('**[ROL İSMİ GÜNCELLENDİ]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`:white_check_mark: Rol İsmi \`\`GÜNCELLENDİ\`\`\n**Eski İsim:** \`\`${oldRole.name}\`\`\n**Yeni İsim:** \`\`${newRole.name}\`\`\n**Rol ID:** ${oldRole.id}\n**Güncelleyen:** <@${userID}> **(ID: ${userID})**`)
			.setTimestamp()
			.setFooter(oldRole.guild.name, oldRole.guild.iconURL)

			modlogkanal.send(roleUpdateName);
		}
		if(oldRole.hexColor !== newRole.hexColor) {
			if(oldRole.hexColor === '#000000') {
				var oldColor = 'Varsayılan';
			}else {
				var oldColor = oldRole.hexColor;
			}
			if(newRole.hexColor === '#000000') {
				var newColor = 'Varsayılan';
			}else {
				var newColor = newRole.hexColor;
			}
			let roleUpdateColor = new Discord.RichEmbed()
			.setTitle('**[ROL RENGİ GÜNCELLENDİ]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`:white_check_mark: **${oldRole.name}** Rengi \`\`GÜNCELLENDİ\`\`\n**Eski Renk:** ${oldColor}\n**Yeni Renk:** ${newColor}\n**Rol ID:** ${oldRole.id}\n**Güncelleyen:** <@${userID}> **(ID: ${userID})**`)
			.setTimestamp()
			.setFooter(oldRole.guild.name, oldRole.guild.iconURL)

			modlogkanal.send(roleUpdateColor);
		}
	})
}
});


client.on('channelCreate', channel => {

	if(!channel.guild) return;
	if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	let modlogs = db.get(`modlogkanaly_${channel.guild.id}`)
  const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
if(modlogs){
	if(channel.type === 'text') {
		var roomType = 'Text';
	}else
	if(channel.type === 'voice') {
		var roomType = 'Voice';
	}else
	if(channel.type === 'category') {
		var roomType = 'Category';
	}

	channel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let channelCreate = new Discord.RichEmbed()
		.setTitle('**[KANAL OLUŞTURULDU]**')
		.setThumbnail(userAvatar)
		.setDescription(`:white_check_mark: Yeni Bir **${roomType}** Kanalı \`\`OLUŞTURULDU\`\`\n**Kanal İsmi:** \`\`${channel.name}\`\` **(ID: ${channel.id})**\n**Oluşturulan:** <@${userID}> **(ID: ${userID})**`)
		.setColor('GREEN')
		.setTimestamp()
		.setFooter(channel.guild.name, channel.guild.iconURL)

		modlogkanal.send(channelCreate);
	})
}
});

client.on('channelDelete', channel => {
	if(!channel.guild) return;
	if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	let modlogs = db.get(`modlogkanaly_${channel.guild.id}`)
  const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
if(modlogs){
	if(channel.type === 'text') {
		var roomType = 'Text';
	}else
	if(channel.type === 'voice') {
		var roomType = 'Voice';
	}else
	if(channel.type === 'category') {
		var roomType = 'Category';
	}

	channel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let channelDelete = new Discord.RichEmbed()
		.setTitle('**[KANAL SİLİNDİ]**')
		.setThumbnail(userAvatar)
		.setDescription(`:white_check_mark: **${roomType}** Kanalı \`\`SİLİNDİ\`\`\n**Kanal İsmi:** \`\`${channel.name}\`\` **(ID: ${channel.id})**\n**Silen:** <@${userID}> **(ID: ${userID})**`)
		.setColor('RED')
		.setTimestamp()
		.setFooter(channel.guild.name, channel.guild.iconURL)

		modlogkanal.send(channelDelete);
	})
}
});

client.on('channelUpdate', (oldChannel, newChannel) => {
	if(!oldChannel.guild) return;

	let modlogs = db.get(`modlogkanaly_${oldChannel.guild.id}`)
  const modlogkanal = oldChannel.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
if(modlogs){
	if(oldChannel.type === 'text') {
		var channelType = 'Text';
	}else
	if(oldChannel.type === 'voice') {
		var channelType = 'Voice';
	}else
	if(oldChannel.type === 'category') {
		var channelType = 'Category';
	}

	oldChannel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldChannel.name !== newChannel.name) {
			let newName = new Discord.RichEmbed()
			.setTitle('**[KANAL GÜNCELLENDİ]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`:wrench: **${channelType}** Kanalı \`\`GÜNCELLENDİ\`\`\n**Eski İsmi:** \`\`${oldChannel.name}\`\`\n**Yeni İsim:** \`\`${newChannel.name}\`\`\n**Kanal ID:** ${oldChannel.id}\n**Güncelleyen:** <@${userID}> **(ID: ${userID})**`)
			.setTimestamp()
			.setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)

			modlogkanal.send(newName);
    }
		if(oldChannel.topic !== newChannel.topic) {
			let newTopic = new Discord.RichEmbed()
			.setTitle('**[KANAL BAŞLIĞI GÜNCELLENDİ]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`:wrench: **${channelType}** Kanalı Başlığı \`\`GÜNCELLENDİ\`\`\n**Eski Başlık:**\n\`\`\`${oldChannel.topic || 'Boş'}\`\`\`\n**Yeni Başlık:**\n\`\`\`${newChannel.topic || 'Boş'}\`\`\`\n**Kanal:** ${oldChannel} **(ID: ${oldChannel.id})**\n**Güncelleyen:** <@${userID}> **(ID: ${userID})**`)
			.setTimestamp()
			.setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)

			modlogkanal.send(newTopic);
		}
	})
}
});


client.on('guildBanAdd', (guild, user) => {

	if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	let modlogs = db.get(`modlogkanaly_${guild.id}`)
  const modlogkanal = guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
if(modlogs){
	guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let banInfo = new Discord.RichEmbed()
		.setTitle('**[KULLANICI BANLANDI]**')
		.setThumbnail(userAvatar)
		.setColor('DARK_RED')
		.setDescription(`:airplane: **${user.username}** Adlı Kullanıcı \`\`BANLANDI\`\`\n**Kullanıcı:** <@${user.id}> **(ID: ${user.id})**\n**Banlayan:** <@${userID}> **(ID: ${userID})**`)
		.setTimestamp()
		.setFooter(guild.name, guild.iconURL)

		modlogkanal.send(banInfo);
	})
}
});

client.on('guildBanRemove', (guild, user) => {
	if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	let modlogs = db.get(`modlogkanaly_${guild.id}`)
  const modlogkanal = guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
if(modlogs){
	guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let unBanInfo = new Discord.RichEmbed()
		.setTitle('**[KULLANICININ BANI AÇILDI]**')
		.setThumbnail(userAvatar)
		.setColor('GREEN')
		.setDescription(`:unlock: **${user.username}** Adlı Kullanıcının \`\`BANI AÇILDI\`\`\n**Kullanıcı:** <@${user.id}> **(ID: ${user.id})**\n**Açan:** <@${userID}> **(ID: ${userID})**`)
		.setTimestamp()
		.setFooter(guild.name, guild.iconURL)

		modlogkanal.send(unBanInfo);
	})
}
});

client.on('guildUpdate', (oldGuild, newGuild) => {

	if(!oldGuild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!oldGuild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	let modlogs = db.get(`modlogkanaly_${oldGuild.id}`)
  const modlogkanal = oldGuild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
if(modlogs){
	oldGuild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldGuild.name !== newGuild.name) {
			let guildName = new Discord.RichEmbed()
			.setTitle('**[SUNUCU İSMİ DEĞİŞTİRİLDİ]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`:white_check_mark: Sunucu İsmi \`\`DEĞİŞTİRİLDİ\`\`\n**Eski İsim:** \`\`${oldGuild.name}\`\`\n**Yeni İsim:** \`\`${newGuild.name}\`\`\n**Değiştiren:** <@${userID}> **(ID: ${userID})**`)
			.setTimestamp()
			.setFooter(newGuild.name, newGuild.iconURL)

			modlogkanal.send(guildName)
		}
		if(oldGuild.region !== newGuild.region) {
			let guildRegion = new Discord.RichEmbed()
			.setTitle('**[SUNUCU BÖLGESİ DEĞİŞTİRİLDİ]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`:white_check_mark: Sunucu Bölgesi \`\`DEĞİŞTİRİLDİ\`\`\n**Eski Bölge:** ${oldGuild.region}\n**Yeni Bölge:** ${newGuild.region}\n**Değiştiren:** <@${userID}> **(ID: ${userID})**`)
			.setTimestamp()
			.setFooter(newGuild.name, newGuild.iconURL)

			modlogkanal.send(guildRegion);
		}
		if(oldGuild.verificationLevel !== newGuild.verificationLevel) {
			if(oldGuild.verificationLevel === 0) {
				var oldVerLvl = 'Yok';
			}else
			if(oldGuild.verificationLevel === 1) {
				var oldVerLvl = 'Düşük';
			}else
			if(oldGuild.verificationLevel === 2) {
				var oldVerLvl = 'Orta';
			}else
			if(oldGuild.verificationLevel === 3) {
				var oldVerLvl = 'Yüksek';
			}else
			if(oldGuild.verificationLevel === 4) {
				var oldVerLvl = 'Çok Yüksek';
			}

			if(newGuild.verificationLevel === 0) {
				var newVerLvl = 'Yok';
			}else
			if(newGuild.verificationLevel === 1) {
				var newVerLvl = 'Düşük';
			}else
			if(newGuild.verificationLevel === 2) {
				var newVerLvl = 'Orta';
			}else
			if(newGuild.verificationLevel === 3) {
				var newVerLvl = 'Yüksek';
			}else
			if(newGuild.verificationLevel === 4) {
				var newVerLvl = 'Çok Yüksek';
			}

			let verLog = new Discord.RichEmbed()
			.setTitle('**[SUNUCU DOĞRULAMA SEVİYESİ DEĞİŞTİ]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`:white_check_mark: Sunucu Doğrulama Seviyesi \`\`DEĞİŞTİ\`\`\n**Eski Doğrulama Seviyesi:** ${oldVerLvl}\n**Yeni Doğrulama Seviyesi:** ${newVerLvl}\n**Değiştiren:** <@${userID}> **(ID: ${userID})**`)
			.setTimestamp()
			.setFooter(newGuild.name, newGuild.iconURL)

			modlogkanal.send(verLog);
		}
	})
}
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
	if(!oldMember.guild) return;

	let modlogs = db.get(`modlogkanaly_${oldMember.guild.id}`)
  const modlogkanal = oldMember.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
if(modlogs){
	oldMember.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;
		var userTag = logs.entries.first().executor.tag;

		if(oldMember.nickname !== newMember.nickname) {
			if(oldMember.nickname === null) {
				var oldNM = `${oldMember.user.username}`;
			}else {
				var oldNM = oldMember.nickname;
			}
			if(newMember.nickname === null) {
				var newNM = `${newMember.user.username}`;
			}else {
				var newNM = newMember.nickname;
			}

			let updateNickname = new Discord.RichEmbed()
			.setTitle('**[KULLANICI ADI DEĞİŞTİ]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`:spy: Kullanıcının Adı \`\`DEĞİŞTİRİLDİ\`\`\n**Kullanıcı:** ${oldMember} **(ID: ${oldMember.id})**\n**Eski Ad:** ${oldNM}\n**Yeni Ad:** ${newNM}\n**Değiştiren:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldMember.guild.name, oldMember.guild.iconURL)

			modlogkanal.send(updateNickname);
		}
		if(oldMember.roles.size < newMember.roles.size) {
			let role = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first();

			let roleAdded = new Discord.RichEmbed()
			.setTitle('**[KULLANICIYA ROL EKLENDİ]**')
			.setThumbnail(oldMember.guild.iconURL)
			.setColor('GREEN')
			.setDescription(`:white_check_mark: **${oldMember.user.username}** Kullanıcısına Rol \`\`EKLENDİ\`\`\n**Kullanıcı:** <@${oldMember.id}> **(ID: ${oldMember.user.id})**\n**Rol:** \`\`${role.name}\`\` **(ID: ${role.id})**\n**Ekleyen:** <@${userID}> **(ID: ${userID})**`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			modlogkanal.send(roleAdded);
		}
		if(oldMember.roles.size > newMember.roles.size) {
			let role = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first();

			let roleRemoved = new Discord.RichEmbed()
			.setTitle('**[KULLANICIDAN ROL ALINDI]**')
			.setThumbnail(oldMember.guild.iconURL)
			.setColor('RED')
			.setDescription(`:negative_squared_cross_mark: **${oldMember.user.username}** Kullanıcısından Rol \`\`ALINDI\`\`\n**Kullanıcı:** <@${oldMember.user.id}> **(ID: ${oldMember.id})**\n**Rol:** \`\`${role.name}\`\` **(ID: ${role.id})**\n**Alan:** <@${userID}> **(ID: ${userID})**`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			modlogkanal.send(roleRemoved);
    }
	})
	if(oldMember.guild.owner.id !== newMember.guild.owner.id) {
		let newOwner = new Discord.RichEmbed()
		.setTitle('**[SUNUCU SAHİBİ DEĞİŞTİ]**')
		.setThumbnail(oldMember.guild.iconURL)
		.setColor('GREEN')
		.setDescription(`:white_check_mark: Sunucu Sahibi \`\`DEĞİŞTİ\`\`\n**Eski Sahip:** <@${oldMember.user.id}> **(ID: ${oldMember.user.id})**\n**Yeni Sahip:** <@${newMember.user.id}> **(ID: ${newMember.user.id})**`)
		.setTimestamp()
		.setFooter(oldMember.guild.name, oldMember.guild.iconURL)

		modlogkanal.send(newOwner);
	}
}
});


client.on('voiceStateUpdate', (voiceOld, voiceNew) => {

	if(!voiceOld.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!voiceOld.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	let modlogs = db.get(`modlogkanaly_${voiceOld.guild.id}`)
  const modlogkanal = voiceOld.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
if(modlogs){
	voiceOld.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userTag = logs.entries.first().executor.tag;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(voiceOld.serverMute === false && voiceNew.serverMute === true) {
			let serverMutev = new Discord.RichEmbed()
			.setTitle('**[KULLANICI SUSTURULDU]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png')
			.setColor('RED')
			.setDescription(`**Kullanıcı:** ${voiceOld} **(ID: ${voiceOld.id})**\n**Susturan:** <@${userID}> (ID: ${userID})\n**Kanal:** \`\`${voiceOld.voiceChannel.name}\`\` **(ID: ${voiceOld.voiceChannel.id})**`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			modlogkanal.send(serverMutev);
		}
		if(voiceOld.serverMute === true && voiceNew.serverMute === false) {
			let serverUnmutev = new Discord.RichEmbed()
			.setTitle('**[KULLANICI SUSTURULMASI KALDIRILDI]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png')
			.setColor('GREEN')
			.setDescription(`**Kullanıcı:** ${voiceOld} **(ID: ${voiceOld.id})**\n**Kaldıran:** <@${userID}> **(ID: ${userID})**\n**Kanal:** \`\`${voiceOld.voiceChannel.name}\`\` **(ID: ${voiceOld.voiceChannel.id})**`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			modlogkanal.send(serverUnmutev);
		}
		if(voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
			let serverDeafv = new Discord.RichEmbed()
			.setTitle('**[KULLANICI SAĞIRLAŞTIRILDI]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png')
			.setColor('RED')
			.setDescription(`**Kullanıcı:** ${voiceOld} **(ID: ${voiceOld.id})**\n**Sağırlaştıran:** <@${userID}> **(ID: ${userID})**\n**Kanal:** \`\`${voiceOld.voiceChannel.name}\`\` **(ID: ${voiceOld.voiceChannel.id})**`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			modlogkanal.send(serverDeafv);
		}
		if(voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
			let serverUndeafv = new Discord.RichEmbed()
			.setTitle('**[KULLANICI SAĞIRLAŞTIRILMASI KALDIRILDI]**')
			.setThumbnail('https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png')
			.setColor('GREEN')
			.setDescription(`**Kullanıcı:** ${voiceOld} **(ID: ${voiceOld.id})**\n**Kaldıran:** <@${userID}> **(ID: ${userID})**\n**Kanal:** \`\`${voiceOld.voiceChannel.name}\`\` **(ID: ${voiceOld.voiceChannel.id})**`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			modlogkanal.send(serverUndeafv);
		}
	})
	if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceOld.voiceChannel) {
		let voiceJoin = new Discord.RichEmbed()
		.setTitle('**[KULLANICI ODAYA KATILDI]**')
		.setColor('GREEN')
		.setThumbnail(voiceOld.user.avatarURL)
		.setDescription(`:arrow_lower_right: <@${voiceOld.id}> Adlı Kullanıcı <#${voiceNew.voiceChannel.name}> Adlı Ses Kanalına \`\`KATILDI\`\` `)
		.setTimestamp()
		.setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)

		modlogkanal.send(voiceJoin);
  }
	if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceNew.voiceChannel) {
		let voiceLeave = new Discord.RichEmbed()
		.setTitle('**[KULLLANICI ODADAN AYRILDI]**')
		.setColor('GREEN')
		.setThumbnail(voiceOld.user.avatarURL)
		.setDescription(`:arrow_lower_right: <@${voiceOld.id}> Adlı Kullanıcı <#${voiceOld.voiceChannel.name}> Adlı Ses Kanalından \`\`AYRILDI\`\` `)
		.setTimestamp()
		.setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)

		modlogkanal.send(voiceLeave);
	}
	if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && voiceNew.voiceChannel && voiceOld.voiceChannel != null) {
		let voiceLeave = new Discord.RichEmbed()
		.setTitle('**[KULLANICI ODA DEĞİŞTİRDİ]**')
		.setColor('GREEN')
		.setThumbnail(voiceOld.user.avatarURL)
		.setDescription(`:repeat: <@${voiceOld.id}> Adlı Kullanıcı Oda \`\`DEĞİŞTİRDİ\`\` \n**Önceki Kanal:** \`\`${voiceOld.voiceChannel.name}\`\` **(ID: ${voiceOld.voiceChannelID})**\n**Yeni Kanal:** \`\`${voiceNew.voiceChannel.name}\`\` **(ID: ${voiceNew.voiceChannelID})**`)
		.setTimestamp()
		.setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)

		modlogkanal.send(voiceLeave);
	}
}
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.TOKEN)