# Examples tgind

```js
// Basic code
const Tgind = require('tgind');
const bot = new Tgind("Bot Token", {"start": true});

bot.on("message", (msg) => {
    msg.send(msg.text)
})
```  

```js
// Basic code matches regex of js in any update
const Tgind = require('tgind');
const bot = new Tgind("Bot Token", {"start": true});

bot.matches(/hi/i, (msg) => {
    msg.send(msg.text)
})
```  

```js
// Basic code for adding commands for example in it if you message /yo then it will be invoked
const Tgind = require('tgind');
const bot = new Tgind("Bot Token", {"start": true});

bot.command("yo", (msg) => {
    msg.send(msg.text)
})
```  

```js
// Basic codee with start and help listeners 
const Tgind = require('tgind');
const bot = new Tgind("Bot Token", {"start": true});

bot.start("you started this bot by /start function")
bot.help("you given command /help for more please visit https://github.com/PanditSiddharth/Tgind/blob/main/examples/readme.md")

bot.command("yo", (msg) => {
    msg.send(msg.text)
})
```  

### Home page  
 https://github.com/PanditSiddharth/Tgind


## sendDoc method 
```js
let Tgind = require('tgind')
let InputFile = require("tgind/classes")

let bot = new Tgind("Your token", {"start": true})

bot.command("doc", async (msg)=> {
    msg.sendDoc(new InputFile("./myfile.pdf", "tgindfile.pdf"))

})

```

## send Medias by  
```js
let Tgind = require('tgind')
let InputFile = require("tgind/classes")

let bot = new Tgind("Your token", {"start": true})

bot.command("doc", async (msg)=> {
    msg.sendVideoc(new InputFile("./myfile.mp4f", "tgindfile.mp4"))

})

```