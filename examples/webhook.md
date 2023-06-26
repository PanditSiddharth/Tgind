
// Basic code for Webhook mode (for example vercel)
```js
const Tgind = require('tgind');
const bot = new Tgind("Bot Token");

bot.on("message", (msg) => {
    msg.send(msg.text)
})

module.exports = async (req, res) => {
    bot.handleUpdate(req.body) // its important it will give updates to all listeners
    res.send('Message received');
  };
```
