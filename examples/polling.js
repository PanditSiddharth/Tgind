// Basic code for Polling mode
let Tgind = require('tgind');
let bot = new Tgind("Bot Token");

bot.on("message", (msg) => {
    msg.send(msg.text)
})
bot.launch({dropUpdates: true});

// Webhook mode in serverless functions
/*
let Tgind = require('tgind');
let bot = new Tgind("Bot Token");

bot.on("message", (msg) => {
    msg.send(msg.text)
})
bot.launch({dropUpdates: true});
*/