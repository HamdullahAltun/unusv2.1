const Discord = require('discord.js');
const db = require('quick.db')
const moment = require('moment');
const chalk = require('chalk');
const ayarlar = require('../ayarlar.json');
const fs = require('fs');

module.exports = async message => {
  if(message.channel.type === 'dm') return
let prefix = await db.fetch(`prefix.${message.guild.id}`)
if (prefix == null) prefix = ayarlar.prefix;
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if(cmd){
	  
	  const cooldowns = new Collection();

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`Lütfen \`${command.name}\` komutunu tekrar kullanabilmek için **${timeLeft.toFixed(1)}** saniye bekleyiniz.`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  
      let çalışmakanal = db.fetch(`çalışmakanal.${message.guild.id}`)
if(cmd.help.name != 'çalışma-kanal' && çalışmakanal && çalışmakanal.includes(message.channel.id)) return;
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms)
  }
  
      }
