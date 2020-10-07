// Native Node Imports
const url = require("url");
const path = require("path");
const db = require('quick.db');
// Used for Permission Resolving...
const Discord = require("discord.js");

// Express Session
const express = require("express");
const app = express();
const moment = require("moment");
require("moment-duration-format");

// Express Plugins
// Specifically, passport helps with oauth2 in general.
// passport-discord is a plugin for passport that handles Discord's specific implementation.
// express-session and level-session-store work together to create persistent sessions
// (so that when you come back to the page, it still remembers you're logged in).
const passport = require("passport");
const session = require("express-session");
const LevelStore = require("level-session-store")(session);
const Strategy = require("passport-discord").Strategy;

// Helmet is specifically a security plugin that enables some specific, useful 
// headers in your page to enhance security.
const helmet = require("helmet");

// Used to parse Markdown from things like ExtendedHelp
const md = require("marked");

module.exports = (client) => {
  // It's easier to deal with complex paths. 
  // This resolves to: yourbotdir/dashboard/
  const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);

  // This resolves to: yourbotdir/dashboard/templates/ 
  // which is the folder that stores all the internal template files.
  const templateDir = path.resolve(`${dataDir}${path.sep}templates`);

  // The public data directory, which is accessible from the *browser*. 
  // It contains all css, client javascript, and images needed for the site.
  app.use("/public", express.static(path.resolve(`${dataDir}${path.sep}public`)));

  // These are... internal things related to passport. Honestly I have no clue either.
  // Just leave 'em there.
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });


  passport.use(new Strategy({
    clientID: client.user.id,
    clientSecret: 'qezfyHcz4b9gn-BlcmBcc_ks6nkYdZEU',
    callbackURL: 'https://unus.tk/callback',
    scope: ["identify", "guilds"]
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  }));

  
  // Session data, used for temporary storage of your visitor's session information.
  // the `secret` is in fact a "salt" for the data, and should not be shared publicly.
  app.use(session({
    secret: '2108',
    resave: false,
    saveUninitialized: false,
  }));

  // Initializes passport and session.
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());

  // The domain name used in various endpoints to link between pages.
  app.locals.domain = 'https://unus.tk';
  
  // The EJS templating engine gives us more power to create complex web pages. 
  // This lets us have a separate header, footer, and "blocks" we can use in our pages.
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");

  // body-parser reads incoming JSON or FORM data and simplifies their
  // use in code.
  var bodyParser = require("body-parser");
  app.use(bodyParser.json());       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 

  /* 
  Authentication Checks. For each page where the user should be logged in, double-checks
  whether the login is valid and the session is still active.
  */
  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/girisyap");
  }

  // This function simplifies the rendering of the page, since every page must be rendered
  // with the passing of these 4 variables, and from a base path. 
  // Objectassign(object, newobject) simply merges 2 objects together, in case you didn't know!
  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
    
  };


  /** PAGE ACTIONS RELATED TO SESSIONS */

  // The login page saves the page the person was on in the session,
  // then throws the user to the Discord OAuth2 login page.
  app.get("/girisyap", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/";
    }
    next();
  },
  passport.authenticate("discord"));

  // Once the user returns from OAuth2, this endpoint gets called. 
  // Here we check if the user was already on the page and redirect them
  // there, mostly.
  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/autherror" }), (req, res) => {
    if (req.user.id === client.ayarlar.sahip) {
      req.session.isAdmin = true;
    } else {
      req.session.isAdmin = false;
    }
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);
    } else {
      res.redirect("/");
    }
    
  });
  
  // If an error happens during authentication, this is what's displayed.
  app.get("/autherror", (req, res) => {
    renderTemplate(res, req, "autherror.ejs");
  });

  // Destroys the session to log out the user.
  app.get("/cikisyap", function(req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/"); //Inside a callback… bulletproof!
    });
    
  });

  /** REGULAR INFORMATION PAGES */

  // Index page. If the user is authenticated, it shows their info
  // at the top right of the screen.
  app.get("/", (req, res) => {
    renderTemplate(res, req, "index.ejs");
    
  });


  // The list of commands the bot has. Current **not filtered** by permission.
  app.get("/komutlar", (req, res) => {
    renderTemplate(res, req, "komutlar.ejs", {md});
  });
  
    // The list of commands the bot has. Current **not filtered** by permission.
  app.get("/ozellikler", (req, res) => {
    renderTemplate(res, req, "ozellikler.ejs", {md});
  });
  
    // The list of commands the bot has. Current **not filtered** by permission.
  app.get("/yapimci", (req, res) => {
    renderTemplate(res, req, "yapimci.ejs", {md});
  });
  
    // The list of commands the bot has. Current **not filtered** by permission.
  app.get("/premium", (req, res) => {
    renderTemplate(res, req, "premium.ejs", {md});
  });
  
  // Bot statistics. Notice that most of the rendering of data is done through this code, 
  // not in the template, to simplify the page code. Most of it **could** be done on the page.
  app.get("/istatistikler", (req, res) => {
    const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
    const members = client.guilds.reduce((p, c) => p + c.memberCount, 0);
    const channels = client.channels.size;
    const guilds = client.guilds.size;
    renderTemplate(res, req, "istatistikler.ejs", {
      stats: {
        version: "0.5",
        servers: guilds,
        members: members,
        channels: channels,
        uptime: duration,
        memoryUsage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
        dVersion: Discord.version,
        nVersion: process.version
      }
    });
  });
  
  app.get("/dashboard", checkAuth, (req, res) => {
    const perms = Discord.EvaluatedPermissions;
    renderTemplate(res, req, "dashboard.ejs", {perms});
  });
  
  // The Admin dashboard is similar to the one above, with the exception that
  // it shows all current guilds the bot is on, not *just* the ones the user has
  // access to. Obviously, this is reserved to the bot's owner for security reasons.
  app.get("/admin", checkAuth, (req, res) => {
    if (!req.session.isAdmin) return res.redirect("/");
    renderTemplate(res, req, "adminim.ejs");
  });
  
  // Simple redirect to the "Settings" page (aka "manage")
  app.get("/dashboard/:guildID", checkAuth, (req, res) => {
    res.redirect(`/dashboard/${req.params.guildID}/genel`);
  });

  // Settings page to change the guild configuration. Definitely more fancy than using
  // the `set` command!
  app.get("/dashboard/:guildID/genel", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/genel.ejs", {guild});
  });

  // When a setting is changed, a POST occurs and this code runs
  // Once settings are saved, it redirects back to the settings page.
  app.post("/dashboard/:guildID/genel", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.writeSettings(guild.id, req.body);
        let ayar = req.body
    if (ayar === {}) return;
    
    if (ayar['prefix']) db.set(`prefix.${guild.id}`, ayar['prefix'])
    if (ayar['ototag']) db.set(`ototag_${guild.id}`, ayar['ototag'])
    res.redirect("/dashboard/"+req.params.guildID+"/genel");
  });
  
    // Settings page to change the guild configuration. Definitely more fancy than using
  // the `set` command!
  app.get("/dashboard/:guildID/sayac", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/sayac.ejs", {guild});
  });
  
    // When a setting is changed, a POST occurs and this code runs
  // Once settings are saved, it redirects back to the settings page.
  app.post("/dashboard/:guildID/sayac", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.writeSettings(guild.id, req.body);
        let ayar = req.body
    if (ayar === {}) return;
    
  if (ayar['prefix']) db.set(`prefix.${guild.id}`, ayar['prefix'])
    if (ayar['sunuculog']) db.set(`modlogkanaly_${guild.id}`, ayar['sunuculog'])
    if (ayar['sayackanal']) db.set(`sayacK_${guild.id}`, ayar['sayackanal'])
    if (ayar['sayacsayi']) db.set(`sayacS_${guild.id}`, ayar['sayacsayi'])
    if (ayar['sayacbbmesaj'])   db.set(`sayacBB_${guild.id}`, ayar['sayacbbmesaj'])
    if (ayar['sayachgmesaj'])   db.set(`sayacHG_${guild.id}`, ayar['sayachgmesaj'])
    
    res.redirect("/dashboard/"+req.params.guildID+"/sayac");
  });
  
      // Settings page to change the guild configuration. Definitely more fancy than using
  // the `set` command!
  app.get("/dashboard/:guildID/filtre", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/filtre.ejs", {guild});
  });
  
    // When a setting is changed, a POST occurs and this code runs
  // Once settings are saved, it redirects back to the settings page.
  app.post("/dashboard/:guildID/filtre", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.writeSettings(guild.id, req.body);
        let ayar = req.body
    if (ayar === {}) return;
    
    
    res.redirect("/dashboard/"+req.params.guildID+"/filtre");
  });
  
      // Settings page to change the guild configuration. Definitely more fancy than using
  // the `set` command!
  app.get("/dashboard/:guildID/otorol", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/otorol.ejs", {guild});
  });
  
    // When a setting is changed, a POST occurs and this code runs
  // Once settings are saved, it redirects back to the settings page.
  app.post("/dashboard/:guildID/otorol", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.writeSettings(guild.id, req.body);
        let ayar = req.body
    if (ayar === {}) return;
   
   if (ayar['otorol']) db.set(`otoRL_${guild.id}`, ayar['otorol'])
     if (ayar['otorolkanal']) db.set(`otoRK_${guild.id}`, ayar['otorolkanal'])
    if (ayar['otorolmesaj']) db.set(`otoRM_${guild.id}`, ayar['otorolmesaj'])
    
    res.redirect("/dashboard/"+req.params.guildID+"/otorol");
  });
  
        // Settings page to change the guild configuration. Definitely more fancy than using
  // the `set` command!
  app.get("/dashboard/:guildID/diger", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/diger.ejs", {guild});
  });
  
    // When a setting is changed, a POST occurs and this code runs
  // Once settings are saved, it redirects back to the settings page.
  app.post("/dashboard/:guildID/diger", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.writeSettings(guild.id, req.body);
        let ayar = req.body
    if (ayar === {}) return;
    if (ayar['sunuculog']) db.set(`modlogkanaly_${guild.id}`, ayar['sunuculog'])
     if (ayar['hgbbkanal']) db.set(`hgbbkanal_${guild.id}`, ayar['hgbbkanal'])
     if (ayar['resimlihgbbgirismesaj']) db.set(`resimliGirisM_${guild.id}`, ayar['resimlihgbbgirismesaj'])
     if (ayar['resimlihgbbcikismesaj']) db.set(`resimliCikisM_${guild.id}`, ayar['resimlihgbbcikismesaj'])
     if (ayar['resimlihgbbkanal']) db.set(`resimlihgbb_${guild.id}`, ayar['resimlihgbbkanal'])
    res.redirect("/dashboard/"+req.params.guildID+"/diger");
  });
  
          // Settings page to change the guild configuration. Definitely more fancy than using
  // the `set` command!
  app.get("/dashboard/:guildID/hgbb", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/hgbb.ejs", {guild});
  });
  
    // When a setting is changed, a POST occurs and this code runs
  // Once settings are saved, it redirects back to the settings page.
  app.post("/dashboard/:guildID/hgbb", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.writeSettings(guild.id, req.body);
        let ayar = req.body
    if (ayar === {}) return;
     if (ayar['hgbbkanal']) db.set(`hgbbkanal_${guild.id}`, ayar['hgbbkanal'])
     if (ayar['resimlihgbbgirismesaj']) db.set(`resimliGirisM_${guild.id}`, ayar['resimlihgbbgirismesaj'])
     if (ayar['resimlihgbbcikismesaj']) db.set(`resimliCikisM_${guild.id}`, ayar['resimlihgbbcikismesaj'])
     if (ayar['resimlihgbbkanal']) db.set(`resimlihgbb_${guild.id}`, ayar['resimlihgbbkanal'])
    res.redirect("/dashboard/"+req.params.guildID+"/hgbb");
  });
  
          // Settings page to change the guild configuration. Definitely more fancy than using
  // the `set` command!
  app.get("/dashboard/:guildID/kayit", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/kayit.ejs", {guild});
  });
  
    // When a setting is changed, a POST occurs and this code runs
  // Once settings are saved, it redirects back to the settings page.
  app.post("/dashboard/:guildID/kayit", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.writeSettings(guild.id, req.body);
        let ayar = req.body
    if (ayar === {}) return;
    if (ayar['kayital']) db.set(`kayitAR_${guild.id}`, ayar['kayital'])
    if (ayar['kayitver']) db.set(`kayitVR_${guild.id}`, ayar['kayitver'])
        if (ayar['kayitolkanal']) db.set(`kayitKanal_${guild.id}`, ayar['kayitolkanal'])
     if (ayar['kayitgirismesaj']) db.set(`kayitGM_${guild.id}`, ayar['kayitgirismesaj'])
         if (ayar['kayitisim']) db.set(`isimsistemi_${guild.id}`, ayar['kayitisim'])
             if (ayar['kayitlogkanal']) db.set(`kayitLog_${guild.id}`, ayar['kayitlogkanal'])


    res.redirect("/dashboard/"+req.params.guildID+"/kayit");
  });
  // Displays the list of members on the guild (paginated).
  // NOTE: to be done, merge with manage and stats in a single UX page.
  app.get("/dashboard/:guildID/uyeler", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    renderTemplate(res, req, "guild/uyeler.ejs", {
      guild: guild,
      members: guild.members.array()
    });
  });

  // This JSON endpoint retrieves a partial list of members. This list can
  // be filtered, sorted, and limited to a partial count (for pagination).
  // NOTE: This is the most complex endpoint simply because of this filtering
  // otherwise it would be on the client side and that would be horribly slow.
  app.get("/dashboard/:guildID/uyeler/list", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    if (req.query.fetch) {
      await guild.fetchMembers();
    }
    const totals = guild.members.size;
    const start = parseInt(req.query.start, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 50;
    let members = guild.members;
    
    if (req.query.filter && req.query.filter !== "null") {
      //if (!req.query.filtervalue) return res.status(400);
      members = members.filter(m=> {
        m = req.query.filterUser ? m.user : m;
        return m["displayName"].toLowerCase().includes(req.query.filter.toLowerCase());
      });
    }
    
    if (req.query.sortby) {
      members = members.sort((a, b) => a[req.query.sortby] > b[req.query.sortby]);
    }
    const memberArray = members.array().slice(start, start+limit);
    
    const returnObject = [];
    for (let i = 0; i < memberArray.length; i++) {
      const m = memberArray[i];
      returnObject.push({
        id: m.id,
        status: m.user.presence.status,
        bot: m.user.bot,
        username: m.user.username,
        displayName: m.displayName,
        tag: m.user.tag,
        discriminator: m.user.discriminator,
        joinedAt: m.joinedTimestamp,
        createdAt: m.user.createdTimestamp,
        highestRole: {
          hexColor: m.highestRole.hexColor
        },
        memberFor: moment.duration(Date.now() - m.joinedAt).format(" D [gün], H [saat], m [dakika], s [saniye]"),
        roles: m.roles.map(r=>({
          name: r.name,
          id: r.id,
          hexColor: r.hexColor
        }))
      });
    }
    res.json({
      total: totals,
      page: (start/limit)+1,
      pageof: Math.ceil(members.size / limit),
      members: returnObject
    });
  });

  // Displays general guild statistics. 
  app.get("/dashboard/:guildID/istatistikler", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/istatistikler.ejs", {guild});
  });
  
  // Leaves the guild (this is triggered from the manage page, and only
  // from the modal dialog)
  app.get("/dashboard/:guildID/leave", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    await guild.leave();
    res.redirect("/dashboard");
  });
  
  ////prefix sıfırla
  
     app.get("/dashboard/:guildID/prefix/sifirla", checkAuth, (req, res) => {
    if (db.has(`prefix.${req.params.guildID}`) === false) {
      return;}
    db.delete(`prefix.${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/genel`);
  });
  
    ////kayitol kanal sıfırla
  
     app.get("/dashboard/:guildID/kayitolkanal/sifirla", checkAuth, (req, res) => {
    if (db.has(`kayitKanal_${req.params.guildID}`) === false) {
      return;}
    db.delete(`kayitKanal_${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/kayit`);
  });
  
      ////kayitol giris sıfırla
  
     app.get("/dashboard/:guildID/kayitgirismesaj/sifirla", checkAuth, (req, res) => {
    if (db.has(`kayitGM_${req.params.guildID}`) === false) {
      return;}
    db.delete(`kayitGM_${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/kayit`);
  });
  
        ////kayitol isim sıfırla
  
     app.get("/dashboard/:guildID/kayitisim/sifirla", checkAuth, (req, res) => {
    if (db.has(`isimsistemi_${req.params.guildID}`) === false) {
      return;}
    db.delete(`isimsistemi_${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/kayit`);
  });
  
          ////kayitol log sıfırla
  
     app.get("/dashboard/:guildID/kayitlogkanal/sifirla", checkAuth, (req, res) => {
    if (db.has(`kayitLog_${req.params.guildID}`) === false) {
      return;}
    db.delete(`kayitLog_${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/kayit`);
  });
  
      ////kayitol rol sıfırla
  
     app.get("/dashboard/:guildID/kayitrol/sifirla", checkAuth, (req, res) => {
    if (db.has(`kayitVR_${req.params.guildID}`) === false) {
      return;}
    db.delete(`kayitVR_${req.params.guildID}`)
       db.delete(`kayitAR_${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/kayit`);
  });
  
  ////sunuculogsıfırla
  
     app.get("/dashboard/:guildID/sunuculog/sifirla", checkAuth, (req, res) => {
    if (db.has(`modlogkanaly_${req.params.guildID}`) === false) {
      return;}
    db.delete(`modlogkanaly_${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/diger`);
  });
  
    ////resimlihgbbkanalsıfırla
  
     app.get("/dashboard/:guildID/resimlihgbbkanal/sifirla", checkAuth, (req, res) => {
    if (db.has(`resimlihgbb_${req.params.guildID}`) === false) {
      return;}
    db.delete(`resimlihgbb_${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/hgbb`);
  });
  
      ////resimlihgbbgirissıfırla
  
     app.get("/dashboard/:guildID/resimlihgbbgirismesaj/sifirla", checkAuth, (req, res) => {
    if (db.has(`resimlihgbbgirismesaj_${req.params.guildID}`) === false) {
      return;}
    db.delete(`resimlihgbbgirismesaj_${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/hgbb`);
  });
  
        ////resimlicikismesajsıfırla
  
     app.get("/dashboard/:guildID/resimlihgbbcikismesaj/sifirla", checkAuth, (req, res) => {
    if (db.has(`resimlihgbbcikismesaj_${req.params.guildID}`) === false) {
      return;}
    db.delete(`resimlihgbbcikismesaj_${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/hgbb`);
  });
  
    ////otorol
  
     app.get("/dashboard/:guildID/otorol/sifirla", checkAuth, (req, res) => {
    if (db.has(`otoRL_${req.params.guildID}`) === false) {
      return;}
    db.delete(`otoRL_${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/otorol`);
  });
  
    ////sayac sıfırla
  
     app.get("/dashboard/:guildID/sayac/sifirla", checkAuth, (req, res) => {
    if (db.has(`sayacK_${req.params.guildID}`) === false) {
      return;}
    db.delete(`sayacK_${req.params.guildID}`)
    db.delete(`sayacS_${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/sayac`);
  });
  
      ////ototag sıfırla
  
     app.get("/dashboard/:guildID/ototag/sifirla", checkAuth, (req, res) => {
    if (db.has(`ototag_${req.params.guildID}`) === false) {
      return;}
    db.delete(`ototag_${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/genel`);
  });
  
        ////otorolkanal sıfırla
  
     app.get("/dashboard/:guildID/otorolkanal/sifirla", checkAuth, (req, res) => {
    if (db.has(`otoRK_${req.params.guildID}`) === false) {
      return;}
    db.delete(`otoRK_${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/otorol`);
  });
  
          ////otorolmesaj sıfırla
  
     app.get("/dashboard/:guildID/otorolkanal/sifirla", checkAuth, (req, res) => {
    if (db.has(`otoRM_${req.params.guildID}`) === false) {
      return;}
    db.delete(`otoRM_${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/otorol`);
  });
  
    ////sayaç hg
  
     app.get("/dashboard/:guildID/sayachgmesaj/sifirla", checkAuth, (req, res) => {
    if (db.has(`sayacHG_${req.params.guildID}`) === false) {
      return;}
    db.delete(`sayacHG_${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/sayac`);
  });
  
    ////sayaç bb
  
     app.get("/dashboard/:guildID/saaycbbmesaj/sifirla", checkAuth, (req, res) => {
    if (db.has(`sayacBB_${req.params.guildID}`) === false) {
      return;}
    db.delete(`sayacBB_${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/sayac`);
  });
  
      ////hgbbsıfırla
  
     app.get("/dashboard/:guildID/hgbbkanal/sifirla", checkAuth, (req, res) => {
    if (db.has(`modlogkanaly_${req.params.guildID}`) === false) {
      return;}
    db.delete(`hgbbkanal_${req.params.guildID}`)
    res.redirect(`/dashboard/${req.params.guildID}/hgbb`);
  });
  
  //resets the guild's settings to the defaults, by simply deleting them.
  app.get("/dashboard/:guildID/reset", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    
    db.delete(`prefix.${guild.id}`)
    db.delete(`otoRL_${req.params.guildID}`)
    db.delete(`modlogkanaly_${req.params.guildID}`)
    db.delete(`sayacS_${req.params.guildID}`)
    db.delete(`sayacK_${req.params.guildID}`)
    db.delete(`hgbbkanal_${req.params.guildID}`)
    db.delete(`sayacBB_${req.params.guildID}`)
    db.delete(`sayacHG_${req.params.guildID}`)
    db.delete(`otoRM_${req.params.guildID}`)
    db.delete(`otoRK_${req.params.guildID}`)
    db.delete(`ototag_${req.params.guildID}`)
        db.delete(`kayitKanal_${req.params.guildID}`)
     db.delete(`kayitGM_${req.params.guildID}`)
     db.delete(`isimsistemi_${req.params.guildID}`)
    db.delete(`kayitLog_${req.params.guildID}`)
     db.delete(`kayitVR_${req.params.guildID}`)
       db.delete(`kayitAR_${req.params.guildID}`)
    res.redirect("/dashboard/"+req.params.guildID);
  });
  
  client.site = app.listen(process.env.PORT);
  
};
