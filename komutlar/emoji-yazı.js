const Discord = require('discord.js');
const client = new Discord.Client();
const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');

const mapping = {
    ' ': '   ',
    '0': ':zero:',
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:',
    '!': ':grey_exclamation:',
    '?': ':grey_question:',
    '#': ':hash:',
    '*': ':asterisk:'
};

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
    mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});

exports.run = (bot, msg, args) => {
    if (args.length < 1) {
        throw '**Lütfen bir mesaj belirtiniz!**';
    }

    msg.channel.send(
        args.join(' ')
            .split('')
            .map(c => mapping[c] || c)
            .join('')
    );
  msg.delete();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['emojiyazı','emojiliyazı','emojiyaz'],
  kategori: "eğlence",
  permLevel: 0
};

exports.help = {
  name: 'emoji-yazı',
  description: 'Mesajınızı emojiye çevirir.',
  usage: 'emoji-yazı <mesaj>'
};