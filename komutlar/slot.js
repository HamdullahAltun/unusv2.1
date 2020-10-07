const Discord = require('discord.js');
exports.run = async (client, message, args) => {

    let slots = ["🍎", "🍌", "🍒", "🍓", "🍈", "🖕"];
    let result1 = Math.floor((Math.random() * slots.length));
    let result2 = Math.floor((Math.random() * slots.length));
    let result3 = Math.floor((Math.random() * slots.length));
    let name = message.author.displayName;
    let aicon = message.author.displayAvatarURL;

    if (slots[result1] === slots[result2] && slots[result3]) {
        let wEmbed = new Discord.RichEmbed()
            .setAuthor("Kazandın!", aicon)
            .setTitle(':slot_machine:Slot:slot_machine:')
            .addField('Sonuç:', slots[result1] + slots[result2] + slots[result3], true)
            .setColor("GREEN");
        message.channel.send(wEmbed);
    } else {
        let embed = new Discord.RichEmbed()
            .setAuthor('Kaybettin', aicon)
            .setTitle(':slot_machine:Slot:slot_machine:')
            .addField('Sonuç', slots[result1] + slots[result2] + slots[result3], true)
            .setColor("RED");
        message.channel.send(embed);
    }

}


exports.conf = {
    aliases: ["slotmakinesi","slotoyna"],
  kategori:"eğlence",
  permLevel: 0
};

exports.help = {
    name: 'slot',
    description: 'Slot makinesi oyununu oynarsınız.',
    usage: 'slot'
}