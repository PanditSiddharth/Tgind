
```js
let Tgind = require('tgind')
let InputFile = require("tgind/classes")

let bot = new Tgind("Your token", {"start": true})

bot.command("doc", async (msg)=> {
    msg.sendDoc(new InputFile("./myfile.pdf", "tgindfile.pdf"))

})
```
