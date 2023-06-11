// Basic code for Polling mode
```js
const Tgind = require('tgind');
const bot = new Tgind("Bot Token", {"start": true});

bot.on("message", (msg) => {
    msg.send(msg.text)
})
```