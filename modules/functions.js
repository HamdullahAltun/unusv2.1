const db = require("quick.db");

module.exports = (client) => {
  client.permlevel = message => {
          let permlvl = 0;
          const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

          while (permOrder.length) {
                  const currentLevel = permOrder.shift();
                  if (message.guild && currentLevel.guildOnly) continue;
                  if (currentLevel.check(message)) {
                          permlvl = currentLevel.level;
                          break;
                  }
          }
          return permlvl;
  };

  client.log = (type, msg, title) => {
          if (!title) title = "Log";
          console.log(`[${type}] [${title}]${msg}`);
  };

  client.awaitReply = async (msg, question, limit = 60000) => {
          const filter = m=>m.author.id = msg.author.id;
          await msg.channel.send(question);
          try {
                  const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
                  return collected.first().content;
          } catch (e) {
                  return false;
          }
  };

  client.clean = async (client, text) => {
          if (text && text.constructor.name == "Promise")
                  text = await text;
          if (typeof evaled !== "string")
                  text = require("util").inspect(text, {depth: 0});

          text = text
                  .replace(/`/g, "`" + String.fromCharCode(8203))
                  .replace(/@/g, "@" + String.fromCharCode(8203))
                  .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

          return text;
  };

  client.writeSettings = (id, newSettings, guild) => {
    
    try {
 /*  db.set(`prefix.${id}`, newSettings['prefix'])
      db.set(`otoRL_${id}`, newSettings['otorol'])
   db.set(`modlogkanaly_${id}`, newSettings['sunuculog'])
    db.set(`sayacK_${id}`, newSettings['sayackanal'])
    db.set(`sayacS_${id}`, newSettings['sayacsayi'])
      db.set(`hgbbkanal_${id}`, newSettings['hgbbkanal'])
   db.set(`sayacBB_${id}`, newSettings['sayacbbmesaj'])
      db.set(`sayacHG_${id}`, newSettings['sayachgmesaj'])*/
    } catch (err) {
      //console.error(err)
    };
        };

  String.prototype.toProperCase = function() {
    return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };    

  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  client.wait = require("util").promisify(setTimeout);

  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Uncaught Exception: ", errorMsg);

    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
  });
};
