const Discord = require("discord.js")
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwODMxNjcwNTUyMDA5MTEzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5ODEzMjY5fQ.-i0garIv6KgpSYQ7PLwbx1Km3yrecXxSjbRZG-DzEbg', client);
const { randomRange, verify } = require('../util/Util');
const { stripIndents } = require('common-tags');

exports.run = async (client, msg, args) => {
	dbl.hasVoted(message.author.id).then(voted => {
		if (voted){
  this.games = new Set();
  
    this.verifyWin = (sides) => {
		return (sides[0] === sides[1] && sides[0] === sides[2])
			|| (sides[0] === sides[3] && sides[0] === sides[6])
			|| (sides[3] === sides[4] && sides[3] === sides[5])
			|| (sides[1] === sides[4] && sides[1] === sides[7])
			|| (sides[6] === sides[7] && sides[6] === sides[8])
			|| (sides[2] === sides[5] && sides[2] === sides[8])
			|| (sides[0] === sides[4] && sides[0] === sides[8])
			|| (sides[2] === sides[4] && sides[2] === sides[6]);
  }
    
  const opponent = msg.mentions.users.first()
  if (!opponent) return msg.reply('Bir kullanıcı girmelisiniz!')
  if (opponent.bot) return msg.reply('Botlar ile oyun oynyamazsınız.');
		if (opponent.id === msg.author.id) return msg.reply('Kendiniz ile oyun oynayamazsınız.');
		if (this.games.has(msg.channel.id)) return msg.reply('Kanal başına sadece bir düello meydana gelebilir.');
		this.games.add(msg.channel.id);
		try {
			await msg.channel.send(`${opponent}, düelloyu kabul ediyor musun?`);
			const verification = await verify(msg.channel, opponent);
			if (!verification) {
				this.games.delete(msg.channel.id);
				return msg.channel.send('Görünüşe göre kabul edilemedi!');
			}
			const sides = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
			const taken = [];
			let userTurn = true;
			let winner = null;
			while (!winner && taken.length < 9) {
				const user = userTurn ? msg.author : opponent;
				const sign = userTurn ? 'X' : 'O';
				await msg.channel.send(stripIndents`
					${user}, hangi tarafı almak istersin?
					\`\`\`
					${sides[0]} | ${sides[1]} | ${sides[2]}
					—————————
					${sides[3]} | ${sides[4]} | ${sides[5]}
					—————————
					${sides[6]} | ${sides[7]} | ${sides[8]}
					\`\`\`
				`);
				const filter = res => {
					const choice = res.content;
					return res.author.id === user.id && sides.includes(choice) && !taken.includes(choice);
				};
				const turn = await msg.channel.awaitMessages(filter, {
					max: 1,
					time: 30000
				});
				if (!turn.size) {
					await msg.channel.send('Üzgünüm, zaman doldu!');
					userTurn = !userTurn;
					continue;
				}
				const choice = turn.first().content;
				sides[Number.parseInt(choice, 10)] = sign;
				taken.push(choice);
				if (this.verifyWin(sides)) winner = userTurn ? msg.author : opponent;
				userTurn = !userTurn;
			}
			this.games.delete(msg.channel.id);
			return msg.channel.send(winner ? `Tebrikler, ${winner}! Kazanan Sensin!` : 'Oh... Hiçkimse kazanamadı.');
		} catch (err) {
			this.games.delete(msg.channel.id);
			throw err;
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
	
	}


exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    kategori:"eğlence"
}

exports.help = {
    name: 'xox',
    description: 'Etiketlediğiniz kişi ile xox oynarsınız.',
    usage: 'xox <@kişi>'
}
