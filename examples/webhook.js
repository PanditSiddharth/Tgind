// Basic code for Webhook mode (for example vercel)
let Tgind = require('tgind');
let bot = new Tgind("Bot Token");

bot.on("message", (msg) => {
    msg.send(msg.text)
})

module.exports = async (req, res) => {
    bot.handleUpdate(req.body)
  
    res.send('Message received');
  };