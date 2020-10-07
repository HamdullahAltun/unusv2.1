const Discord = require('discord.js')

exports.run = (client, message, args) => {
	try {
		const embed = new Discord.RichEmbed()
			.setAuthor(`${message.guild.name} Sunucusu Roller Listesi`)
      .setThumbnail(message.guild.iconURL, true)
    .setDescription(`${message.guild.roles.filter(r => r.name !== "@everyone").map(r => r).join(' | ')}`)
			.setColor("RANDOM")
    .setFooter(`${message.author.tag} Tarafından istendi.`)
    .setTimestamp()
		message.channel.send({embed})
	} catch (err) {
		const embed = new Discord.RichEmbed()
    .setAuthor(`${message.guild.name} Sunucusu Roller Listesi`)
      .setThumbnail(message.guild.iconURL, true)
			.setDescription('Çok fazla rol bulunmakta veya rol bulunmamakta!')
			.setColor("RED")
			.setTimestamp()
		message.channel.send({embed})
	}
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['roller','roles','tümroller'],
	permLevel: 0,
	kategori: 'sunucu'
}

exports.help = {
	name: 'roller',
	description: 'Sunucuda bulunan rolleri gösterir.',
	usage: 'roller'
}