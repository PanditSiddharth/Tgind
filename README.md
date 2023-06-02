# Tgind  
Telegram bot api which gives you simplest way to make your bots

Telegram support group
https://telegram.me/tgindApi

Tgind Updates:
https://telegram.me/tgindApi

#### Install it by cammand  
```js
npm i tgind
```

## Example:   
Basic template to start creating bot  

### Polling mode 
         (If you are begginer just start by it)

```js
let Tgind = require('tgind');
let bot = new Tgind("Yor bot token", {"start": true});

bot.on("message", (msg) => {
    msg.send(msg.text)
})
```

### Webhook Mode  

// Basic code for Webhook mode (for example vercel)  
```js
let Tgind = require('tgind');
let bot = new Tgind("Bot Token");

bot.on("message", (msg) => {
    msg.send(msg.text)
})

module.exports = async (req, res) => {
    bot.handleUpdate(req.body) // its important it will give updates to all listeners
    res.send('Message received');
  };
```
#### is it easy ?

## More Examples
https://github.com/PanditSiddharth/Tgind/blob/main/examples/readme.md

## All functios

```js
Listnerers
bot.on(event, callbackFunction)
bot.command(commandName, callbackFunction)
bot.matches(string or regex, callbackFunction)

/*
* These all functions will starts by Tgind class instance
*   For Example 
*   let bot = new Tgind("bot token")
*   bot.send(chatid, text)
*
* Now see all written bellow
*/

Some Main functions
request(functionNameOfTelegram, FunctionOptions, headers)  // universal functiona
stop(options) // Stops bot from fetching updates  
launch(options)  // for starting bot in polling mode  
handleUpdates(update, options) // for starting by with webhook updates  

start(message)
help(message)
send(chatid, text, options)   
edit(chatid, message_id, text, options)   
del(chatid, message_id)  
mute(chatid, user_id, options)  
unmute(chatid, user_id, options)  
ban(chatid, user_id, options)  
unban(chatid, user_id, options)  
promote(chatid, user_id, options)  
demote(chatid, user_id, options)  
getMember(chatid, userid, options)  
pin(chatid, message_id, options)  
unpin(chatid, message_id, options)  
unpinAll(chatid, options)  
getChat(chatid, options)  
getMe()
getAdmins(chatid, options)  
getMemberCount(chatid, options)  
leaveChat(chatid, options)  
answerCallbackQuery(callback_query_id, options)  
approveJoinRequest(chatid, user_id, options)  
declineJoinRequest(chatid, user_id, options)  
forward(chatid, from_chat_id, message_id, options)  
copy(chatid, from_chat_id, message_id, options)  
sendPhoto(chat, photo_link_or_id, options)  
sendAudio(chat, new InputFile(path, filename), options)  // import class InputFile first by let InputFile = require(tgind/classes)
sendVideo(chat, new InputFile(path, filename), options)  // import class InputFile first by let InputFile = require(tgind/classes)
sendLocation(chat, latitude, longitude, options)  
sendDoc(chat,new InputFile(path, filename), options)  // import class InputFile first by let InputFile = require(tgind/classes)
sendVenue(chat, latitude, longitude, title, address, options)  
sendLocation(chat, phone_number, first_name, options)  
sendPoll(chat, question, your_options, options)  
sendDice(chatid, options)  
exportChatInviteLink(chatid, options)  
link(chatid, options)  
revokeLink(chatid, options)  
sendAction(chatid, action, options)  
getUserProfilePhotos(user_id, options)  
getFile(file_id, options)  
deleteWebhook(optional_dropUpdates)  
```  

You can use `request` function for all telegrams functions  
`bot.request(your function name, function parameters)`  

### Example:  

```js
let Tgind = require('tgind');
let bot = new Tgind("your bot token");

bot.on("message", (msg) => {
    bot.request("sendMessage", {"chat_id": msg.chat.id, "text": msg.text})
})

bot.launch({"dropUpdates": true});
```

Edit message example :  

```js
let Tgind = require('tgind');
let bot = new Tgind("Give here your bot token");

bot.on("message", (msg) => {
    bot.edit(<chat id>, <message id>, <your text>)
})

bot.launch({"dropUpdates": true});
```

## sendDoc method 
```js
let Tgind = require('tgind')
let InputFile = require("tgind/classes")

let bot = new Tgind("Your token", {"start": true})

bot.command("doc", async (msg)=> {
    msg.sendDoc(new InputFile("./myfile.pdf", "tgindfile.pdf"))

})

```

it supports all tg functions and it is a light weight api  

You can see all telegram bot api functions by this link  
Example: `sendMessage`   
https://core.telegram.org/bots/api#sendmessage  

And write as it in `request("sendMessage", {"chat_id": your chat id, other params})`  

Developer @PanditSiddharth  
Git: https://github.com/PanditSiddharth/Tgind  
https://Telegram.me/PanditSiddharth  
