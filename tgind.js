let axios = require('axios');
const EventEmitter = require('events');

class TelegramError extends Error {
  constructor(msg){
    super(msg)
  }
}

async function error(msg){
      const newErrorMessage = msg.message.split('\n').slice(2).join('\n');
      await console.error(newErrorMessage);
}

class Tgind extends EventEmitter {
  constructor(TOKEN, options = {}) {
    super()
    this.TOKEN = TOKEN;
    this.options = options;
    this.offset = 0;
    if(options.start){
      if(!options.dropUpdates)
      this.start({"dropUpdates": true})
      else
      this.start()
    }
  }

  request = async (method, options) => {
    return (await axios.post(`https://api.telegram.org/bot${this.TOKEN}/${method}`, options)).data
  }

  send = async (chat, text, options = {}) => {

    if (!chat || !text)
    return this.error("Chat id and message_text required")
    options.chat_id = chat;
    options.text = text;
    return await this.request("sendMessage", options)
  }

  edit = async (chat, message_id, text, options = {}) => {
    if (!chat || !text)
      return this.error("Chat id, message_id and message_text required")
    options.chat_id = chat;
    options.message_id = message_id;
    options.text = text;
    return await this.request("editMessageText", options)
  }

  forword = async (chat, from_chat, message_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.message_id = message_id;
    options.from_chat_id = from_chat;
    return await this.request("forwardMessage", options)
  }

  copy = async (chat, from_chat, message_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.message_id = message_id;
    options.from_chat_id = from_chat;
    return await this.request("copyMessage", options)
  }

  sendPhoto = async (chat, photo_link_or_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.photo = photo_link_or_id;
    return await this.request("sendPhoto", options)
  }

  sendAudio = async (chat, audio_link_or_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.audio = audio_link_or_id;
    return await this.request("sendAudio", options)
  }

  sendVideo = async (chat, video_link_or_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.video = video_link_or_id;
    return await this.request("sendVideo", options)
  }

  sendLocation = async (chat, latitude, longitude, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.latitude = latitude;
    options.longitude = longitude;
    return await this.request("sendLocation", options)
  }

  sendDoc = async (chat, doc_link_or_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.document = doc_link_or_id;
    return await this.request("sendDocument", options)
  }

  del = async (chat, message_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.message_id = message_id;
    return await this.request("deleteMessage", options)
  }

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

  sendContact = async (chat, phone_number, first_name, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.phone_number = phone_number;
    options.first_name = first_name;
    return await this.request("sendContact", options)
  }

  sendPoll = async (chat, question, your_options, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.question = question;
    options.options = your_options;
    return await this.request("sendPoll", options)
  }

  sendDice = async (chat, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    return await this.request("sendDice", options)
  }

  sendAction = async (chat, action, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.action = action;
    return await this.request("sendChatAction", options)
  }

  ban = async (chat, user_id, options = {}) => {
    if (!chat)
      return this.error("Chat id")
    options.chat_id = chat;
    options.user_id = user_id;
    return await this.request("banChatMember", options)
  }

  unban = async (chat, user_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.user_id = user_id;
    return await this.request("unbanChatMember", options)
  }

  mute = async (chat, user_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")

    options.chat_id = chat;
    options.user_id = user_id;
    if (!options.permissions)
      options.permissions = { "can_send_messages": false }

    return await this.request("restrictChatMember", options)
  }

  unmute = async (chat, user_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")

    options.chat_id = chat;
    options.user_id = user_id;
    if (!options.permissions)
      options.permissions = { "can_send_messages": true }

    return await this.request("restrictChatMember", options)
  }

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

  demote = async (chat, user_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.user_id = user_id;

    if (!options.permissions)
      options.permissions = { "can_send_messages": true }
    return await this.request("setChatPermissions", options)
  }

  exportChatInviteLink = async (chat, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    return await this.request("exportChatInviteLink", options)
  }

  link = async (chat, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    return await this.request("createChatInviteLink", options)
  }

  revokeLink = async (chat, invite_link, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.invite_link = invite_link;
    return await this.request("revokeChatInviteLink", options)
  }

  approveJoinRequest = async (chat, user_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.user_id = user_id;
    return await this.request("approveChatJoinRequest", options)
  }

  declineJoinRequest = async (chat, user_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.user_id = user_id;
    return await this.request("declineChatJoinRequest", options)
  }

  pin = async (chat, message_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.message_id = message_id;
    return await this.request("pinChatMessage", options)
  }

  unpin = async (chat, message_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.message_id = message_id;
    return await this.request("unpinChatMessage", options)
  }

  unpinAll = async (chat, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    return await this.request("unpinAllChatMessages", options)
  }

  leaveChat = async (chat, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    return await this.request("leaveChat", options)
  }

  getChat = async (chat, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    return await this.request("getChat", options)
  }

  getAdmins = async (chat, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    return await this.request("getChatAdministrators", options)
  }

  getMemberCount = async (chat, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    return await this.request("getChatMemberCount", options)
  }

  getMember = async (chat, user_id, options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    options.chat_id = chat;
    options.user_id = user_id;
    return await this.request("getChatMember", options)
  }

  getFile = async (file_id, options = {}) => {
    options.file_id = file_id;
    return await this.request("getFile", options)
  }

  getUserProfilePhotos = async (user_id, options = {}) => {
    if (!user_id)
      return console.error("User id required")
    options.user_id = user_id;
    return await this.request("getUserProfilePhotos", options)
  }

  answerCallbackQuery = async (callback_query_id, options = {}) => {
    options.callback_query_id = callback_query_id;
    return await this.request("answerCallbackQuery", options)
  }

  deleteWebhook = async (drop_pending_updates = true) => {
    let options = {};
    options.drop_pending_updates = drop_pending_updates;
    return await this.request("deleteWebhook", options)
  }

  error = (msg, options = {}) => {
    throw new TelegramError(msg)
  }

  start = async (options = {}) => {
   return await this.launch(options)
  }

  handleUpdate = async (update, options = {}) => {
    if(!update)
    return console.log("You must pass update parameter in it")
    if(!update.update_id)
    return console.log("You must give telegram update (get it in your endpoint listener) not full update or any other")
    if(this.run)
    this.run = false;

    let evnt = Object.keys(update)[1]
    update[evnt].update_id = update.update_id

    let keys = Object.keys(this)
    for (let i = 4; i < (keys.length -8); i++) {
      if(keys[i] == "getFile")
      break;

    if(typeof this[keys[i]] != "function")
    continue;

    let func = this[keys[i]].bind(null, update[evnt].chat.id)
    Object.defineProperty(update[evnt], keys[i], {
    "value": func,
    "enumerable": false
  })
  }

    this.emit(evnt, update[evnt]);
  }

  launch = async (options = {}) => {
    if(this.run)
    return this.run = false
    options.timeout = 10000;
    
    if(options.drop_pending_updates || options.dropUpdates){
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
          update[evnt].update_id = update.update_id

          for (let i = 4; i < (keys.length -8); i++) {
            if(keys[i] == "getFile")
            break;
            // console.log(typeof this[keys[i]], keys[i])
          if(typeof this[keys[i]] != "function")
          continue;

          let func = this[keys[i]].bind(null, update[evnt].chat.id)
          Object.defineProperty(update[evnt], keys[i], {
          "value": func,
          "enumerable": false
        })
        
        }

          this.emit(evnt, update[evnt]);
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