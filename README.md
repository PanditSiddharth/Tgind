# Tgind  
Telegram bot api which gives you simplest way to make your bots

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
let bot = new Tgind("Yor bot token", {"polling": true});

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

## All functios

```js
request(functionNameOfTelegram, FunctionOptions)  // universal function  

stop(options) // Stops bot from fetching updates  
start(options) // for starting bot in polling mode  
handleUpdates(update, options)  // for starting by with webhook updates  

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
getAdmins(chatid, options)  
getMemberCount(chatid, options)  
leaveChat(chatid, options)  
answerCallbackQuery(callback_query_id, options)  
approveJoinRequest(chatid, user_id, options)  
declineJoinRequest(chatid, user_id, options)  
forward(chatid, from_chat_id, message_id, options)  
copy(chatid, from_chat_id, message_id, options)  
sendPhoto(chat, photo_link_or_id, options)  
sendAudio(chat, audio_link_or_id, options)  
sendVideo(chat, video_link_or_id, options)  
sendLocation(chat, latitude, longitude, options)  
sendDoc(chat, document, options)  
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
launch(options)  
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

bot.start({"dropUpdates": true});
```

Edit message example :  

```js
let Tgind = require('tgind');
let bot = new Tgind("Give here your bot token");

bot.on("message", (msg) => {
    bot.edit(<chat id>, <message id>, <your text>)
})

bot.start({"dropUpdates": true});
```

it supports all tg functions and it is a light weight api  

You can see all telegram bot api functions by this link  
Example: `sendMessage`   
https://core.telegram.org/bots/api#sendmessage  

And write as it in `request("sendMessage", {"chat_id": your chat id, other params})`  

Developer @PanditSiddharth  
Git: https://github.com/PanditSiddharth/Tgind  
https://Telegram.me/PanditSiddharth  
