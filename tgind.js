let axios = require('axios');
const EventEmitter = require('events');

class TelegramError extends Error {
  constructor(msg) {
    super(msg)
  }
}

async function error(msg) {
  const newErrorMessage = msg.message.split('\n').slice(2).join('\n');
  await console.error(newErrorMessage);
}


class Tgind extends EventEmitter {
  /**
   * 
   * @param {string} TOKEN 
   * @param {any | undefined} options 
   */
  constructor(TOKEN, options = {}) {
    super()
    this.TOKEN = TOKEN;
    this.options = options;
    this.offset = 0;
    if (options.start) {
      if (!options.dropUpdates)
        this.launch({ "dropUpdates": true })
      else
        this.launch()
    }
  }

  request = async (method, options) => {
    return (await axios.post(`https://api.telegram.org/bot${this.TOKEN}/${method}`, options)).data
  }

  /**
   * 
   * @param {string | number | undefined} chat 
   * @param {string | number} text 
   * @param {any | undefined} options 
   * @returns 
   * 
   * @example
   * bot.send(-100123456789, "Hello");
   * or you can use directly without giving chatid by using context object of your listener
   * 
   * @example
   * bot.on("message", ctx => ctx.send("Hello"))
   */
  send = async (chat, text, options = {}) => {

    if (!chat || !text)
      return this.error("Chat id and message_text required")
    options.chat_id = chat;
    options.text = text;
    return await this.request("sendMessage", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {number | undefined } message_id  
   * @param {*} text 
   * @param {any | undefined} options 
   * @returns 
   */
  edit = async (chat, message_id, text, options = {}) => {
    if (!chat || !text)
      return this.error("Chat id, message_id and message_text required")
    options.chat_id = chat;
    options.message_id = message_id;
    options.text = text;
    return await this.request("editMessageText", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} from_chat 
   * @param {number | undefined } message_id  
   * @param {any | undefined} options 
   * @returns 
   */
  forword = async (chat, from_chat, message_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.message_id = message_id;
    options.from_chat_id = from_chat;
    return await this.request("forwardMessage", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} from_chat 
   * @param {number | undefined } message_id 
   * @param {any | undefined} options 
   * @returns 
   */
  copy = async (chat, from_chat, message_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.message_id = message_id;
    options.from_chat_id = from_chat;
    return await this.request("copyMessage", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} photo_link_or_id 
   * @param {any | undefined} options 
   * @returns 
   */
  sendPhoto = async (chat, photo_link_or_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.photo = photo_link_or_id;
    return await this.request("sendPhoto", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} audio_link_or_id 
   * @param {any | undefined} options 
   * @returns 
   */
  sendAudio = async (chat, audio_link_or_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.audio = audio_link_or_id;
    return await this.request("sendAudio", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} video_link_or_id 
   * @param {any | undefined} options 
   * @returns 
   */
  sendVideo = async (chat, video_link_or_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.video = video_link_or_id;
    return await this.request("sendVideo", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} latitude 
   * @param {*} longitude 
   * @param {any | undefined} options 
   * @returns 
   */
  sendLocation = async (chat, latitude, longitude, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.latitude = latitude;
    options.longitude = longitude;
    return await this.request("sendLocation", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} doc_link_or_id 
   * @param {any | undefined} options 
   * @returns 
   */
  sendDoc = async (chat, doc_link_or_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.document = doc_link_or_id;
    return await this.request("sendDocument", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {number | undefined } message_id  
   * @param {any | undefined} options 
   * @returns 
   */
  del = async (chat, message_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.message_id = message_id;
    return await this.request("deleteMessage", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} latitude 
   * @param {*} longitude 
   * @param {*} title 
   * @param {*} address 
   * @param {any | undefined} options 
   * @returns 
   */
  sendVenue = async (chat, latitude, longitude, title, address, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.latitude = latitude;
    options.longitude = longitude;
    options.title = title;
    options.address = address;
    return await this.request("sendVenue", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} phone_number 
   * @param {*} first_name 
   * @param {any | undefined} options 
   * @returns 
   */
  sendContact = async (chat, phone_number, first_name, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.phone_number = phone_number;
    options.first_name = first_name;
    return await this.request("sendContact", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} question 
   * @param {*} your_options 
   * @param {any | undefined} options 
   * @returns 
   */
  sendPoll = async (chat, question, your_options, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.question = question;
    options.options = your_options;
    return await this.request("sendPoll", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {any | undefined} options 
   * @returns 
   */
  sendDice = async (chat, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    return await this.request("sendDice", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} action 
   * @param {any | undefined} options 
   * @returns 
   */
  sendAction = async (chat, action, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.action = action;
    return await this.request("sendChatAction", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  ban = async (chat, user_id, options = {}) => {
    if (!chat)
      return this.error("Chat id")
    options.chat_id = chat;
    options.user_id = user_id;
    return await this.request("banChatMember", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  unban = async (chat, user_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.user_id = user_id;
    return await this.request("unbanChatMember", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  mute = async (chat, user_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")

    options.chat_id = chat;
    options.user_id = user_id;
    if (!options.permissions)
      options.permissions = { "can_send_messages": false }

    return await this.request("restrictChatMember", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  unmute = async (chat, user_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")

    options.chat_id = chat;
    options.user_id = user_id;
    if (!options.permissions)
      options.permissions = { "can_send_messages": true }

    return await this.request("restrictChatMember", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  promote = async (chat, user_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.user_id = user_id;

    if (Object.keys(options).length < 3) {
      options.can_post_messages = true;
      options.can_delete_messages = true;
      options.can_pin_messages = true;
      options.can_restrict_members = true;
      options.can_manage_video_chats = true;
      options.can_invite_users = true;
    }

    return await this.request("promoteChatMember", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  demote = async (chat, user_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.user_id = user_id;

    if (!options.permissions)
      options.permissions = { "can_send_messages": true }
    return await this.request("setChatPermissions", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {any | undefined} options 
   * @returns 
   */
  exportChatInviteLink = async (chat, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    return await this.request("exportChatInviteLink", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {any | undefined} options 
   * @returns 
   */
  link = async (chat, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    return await this.request("createChatInviteLink", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} invite_link 
   * @param {any | undefined} options 
   * @returns 
   */
  revokeLink = async (chat, invite_link, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.invite_link = invite_link;
    return await this.request("revokeChatInviteLink", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  approveJoinRequest = async (chat, user_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.user_id = user_id;
    return await this.request("approveChatJoinRequest", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  declineJoinRequest = async (chat, user_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.user_id = user_id;
    return await this.request("declineChatJoinRequest", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {number | undefined } message_id  
   * @param {any | undefined} options 
   * @returns 
   */
  pin = async (chat, message_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.message_id = message_id;
    return await this.request("pinChatMessage", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {number | undefined } message_id  
   * @param {any | undefined} options 
   * @returns 
   */
  unpin = async (chat, message_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.message_id = message_id;
    return await this.request("unpinChatMessage", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {any | undefined} options 
   * @returns 
   */
  unpinAll = async (chat, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    return await this.request("unpinAllChatMessages", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {any | undefined} options 
   * @returns 
   */
  leaveChat = async (chat, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    return await this.request("leaveChat", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {any | undefined} options 
   * @returns 
   */
  getChat = async (chat, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    return await this.request("getChat", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {any | undefined} options 
   * @returns 
   */
  getAdmins = async (chat, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    return await this.request("getChatAdministrators", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {any | undefined} options 
   * @returns 
   */
  getMemberCount = async (chat, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    return await this.request("getChatMemberCount", options)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  getMember = async (chat, user_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.user_id = user_id;
    return await this.request("getChatMember", options)
  }

  /**
   * 
   * @param {*} file_id 
   * @param {any | undefined} options 
   * @returns 
   */
  getFile = async (file_id, options = {}) => {
    options.file_id = file_id;
    return await this.request("getFile", options)
  }

  /**
   * 
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  getUserProfilePhotos = async (user_id, options = {}) => {
    if (!user_id)
      return console.error("User id required")
    options.user_id = user_id;
    return await this.request("getUserProfilePhotos", options)
  }

  /**
   * 
   * @param {*} query_id 
   * @param {*} options 
   * @returns 
   */
  answerCallbackQuery = async (query_id, options = {}) => {
    options.callback_query_id = query_id;
    return await this.request("answerCallbackQuery", options)
  }

  /**
   * 
   * @param {*} cmd 
   * @param {*} callback 
   */
  command = async (cmd, callback) => {
    this.on("message", async (msg) => {
      if(!msg.text.startsWith("/"))
      return
      if(!cmd.startsWith('/'))
      cmd = "/" + cmd
      if (!msg.text.startsWith(cmd))  
      return
      let mee;
      if(msg.text.includes("@")){
        mee = await this.getMe()
        if(msg.text.match(mee.result.username))
        callback(msg)
      } else
        callback(msg)
    })
  }

  /**
   * 
   * @param {*} str 
   * @param {*} callback 
   */
  matches = async (str, callback) => {
    this.on("message", async (msg) => {
      let mstr = msg.text.match(str)
      if (mstr) {
        Object.assign(msg, mstr)
        callback(msg)
      }
    })
  }

  getMe = async () => {
    let options = {}
    return await this.request("getMe", options)
  }

  /**
   * 
   * @param {*} drop_pending_updates 
   * @returns 
   */
  deleteWebhook = async (drop_pending_updates = true) => {
    let options = {};
    options.drop_pending_updates = drop_pending_updates;
    return await this.request("deleteWebhook", options)
  }

  /**
   * 
   * @param {*} msg 
   * @param {any | undefined} options 
   */
  error = (msg, options = {}) => {
    throw new TelegramError(msg)
  }

  /**
   * 
   * @param {string | number } str 
   * @returns 
   */
  start = async (str) => {
   this.on("message", (msg)=> msg.text.startsWith("/start") ? this.send(msg.chat.id, str) : false);
  }

  /**
   * 
   * @param {string | number } str 
   */
  help = async (str) => {
    this.on("message", async (msg)=> msg.text.startsWith("/help") ? this.send(msg.chat.id, str) : false);
   }

  /**
   * 
   * @param {*} update 
   * @param {any | undefined} options 
   * @returns 
   */
  handleUpdate = async (update, options = {}) => {
    if (!update)
      return console.log("You must pass update parameter in it")
    if (!update.update_id)
      return console.log("You must give telegram update (get it in your endpoint listener) not full update or any other")
    if (this.run)
      this.run = false;
    let evnt = Object.keys(update)[1]
    let updt = update[evnt]
    updt.update_id = update.update_id

    let keys = Object.keys(this)
    let nchat = keys.indexOf("getFile")
    for (let i = 4; i < (keys.length - 8); i++) {

      if (typeof this[keys[i]] != "function")
        continue;
        let func;
        if (i >= nchat)
         func = this[keys[i]]
         else
         func = this[keys[i]].bind(null, updt.chat.id)
      Object.defineProperty(updt, keys[i], {
        "value": func,
        "enumerable": false
      })
    }

    this.emit(evnt, updt);
  }

  launch = async (options = {}) => {
    if (this.run)
      return this.run = false
    options.timeout = 10000;

    if (options.drop_pending_updates || options.dropUpdates) {
      await this.deleteWebhook(true)
    }

    this.run = true
    let keys = Object.keys(this)
    while (this.run) {

      options.offset = this.offset;
      const response = await this.request("getUpdates", options)
        .catch((err) => { throw new Error("Error getting updates\n", err) })

      if (response.ok && response.result.length > 0) {
        this.offset = response.result[response.result.length - 1].update_id + 1;
        response.result.forEach(update => {
          let evnt = Object.keys(update)[1]
          let updt = update[evnt]
         
          if (updt.id) {
            delete updt.message.from
            let msgg = updt.message
            delete updt.message;
            updt = { ...updt, ...msgg }
          }
          updt.update_id = update.update_id

          let nchat = keys.indexOf("getFile")
          for (let i = 4; i < (keys.length - 8); i++) {

            if (typeof this[keys[i]] != "function")
              continue;
            let func;
            if (i >= nchat)
             func = this[keys[i]]
             else
             func = this[keys[i]].bind(null, updt.chat.id)
    
            Object.defineProperty(updt, keys[i], {
              "value": func,
              "enumerable": false
            })

          }

          this.emit(evnt, updt);
        });
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  stop = async (options = {}) => {
    this.run = false;
    return await this.deleteWebhook(true)
  }
}

module.exports = Tgind;
