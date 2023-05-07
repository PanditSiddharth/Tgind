// Basic code for Polling mode
let Tgind = require('tgind');
let bot = new Tgind("Bot Token", {"start": true});

bot.on("message", (msg) => {
    msg.send(msg.text)
})