const source = require('gamedig');
const Discord = require("discord.js")
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwODMxNjcwNTUyMDA5MTEzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5ODEzMjY5fQ.-i0garIv6KgpSYQ7PLwbx1Km3yrecXxSjbRZG-DzEbg', client);

exports.run = async (client, message, args) => {
  dbl.hasVoted(message.author.id).then(voted => {
    if (voted){
  try {
    let mesaj = args.slice(0).join(' ')

  let eee = mesaj.split(':');
    let host = eee[0];

    if (host === '127.0.0.1') {
const embed = new Discord.RichEmbed()
.setDescription('`127.0.0.1` böyle bir sunucu yok.')
      return message.channel.send(embed);
    }

    let port = eee[1] ? parseInt(eee[1]) : 27015;

    let data = await source.query({
      type: 'csgo',
      host: host,
      port: port
    });

    let stats = [
      {
        name: 'Sunucu IP',
        value: `\`${host}\``,
        inline: true
      },
      {
        name: 'Oyuncular',
        value: `${data.players.length}/${data.maxplayers}`,
        inline: true
      },
      {
        name: 'Harita',
        value: data.map
      }
    ];

    if (data.players.length > 0) {
      let players = [];
      let scores = [];
      let playtimes = [];
      for (let i = 0; i < data.players.length; i++) {
        players.push(data.players[i].name);
      }
      for (let i = 0; i < data.players.length; i++) {
        scores.push(data.players[i].score);
      }
      for (let i = 0; i < data.players.length; i++) {
        playtimes.push(`${parseInt(data.players[i].time)}s`);
      }
      stats.push(
        {
          name: 'Oyuncu',
          value: `\`\`\`http\n${players.join('\n')}\`\`\``,
          inline: true
        },
        {
          name: 'Skor',
          value: `\`\`\`http\n${scores.join('\n')}\`\`\``,
          inline: true
        },
        {
          name: 'Oynama Zamanı',
          value: `\`\`\`http\n${playtimes.join('\n')}\`\`\``,
          inline: true
        },
        {
          name: 'Katıl',
          value: `steam://connect/${host}:${port}`
        }
      );
    }

    let footer;
    if (data.password) {
      footer = {
        text: 'Bu sunucu gizli olduğu için bilgiler alınamıyor.',
        icon_url: 'https://cdn.glitch.com/77274e00-37f5-4de6-a341-1f37d56e6596%2Flock.png?v=1569160788055'
      };
    }

    message.channel.send({
      embed: {
        color: 0x36393E,
        title: data.name,
        description: '[Counter-Strike: Global Offensive](https://store.steampowered.com/app/730/)',
        fields: stats,
        footer: footer
      }
    });
  }
  catch (e) {
    if (e.toString() === 'UDP Watchdog Timeout') {
      return message.reply('Bilinmeyen IP. Lütfen geçerli bir IP giriniz.')
    }
    throw e;
  }
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
  aliases: ['csgoserverbilgi',"csgosv"],
  enabled: true,
  guildOnly: false,
  kategori:"kullanıcı",
permLevel: 0
};

exports.help = {
  name: 'csgosunucubilgi',
  description: 'IPsini girdiğiniz CS:GO sunucusu hakkında istatistikleri öğrenirsiniz.',
  usage: 'csgosunucubilgi 185.193.165.153'
};