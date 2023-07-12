import { EventEmitter } from "events";
import Event from "./tg/event";
type Options = {[key: string]: any;}
import axios from "axios";

export class Scene extends Event {
    sceneName:any;
    constructor(sceneName: string, options:any= {} ){
     super();
        this.sceneName = sceneName
    }

  request = async (method:string, options:any, headers:Options = {}) => {
    // let formData = {}
    // Object.assign(formData, this.formData)
    let res;

    if (Object.keys(headers).length > 0) {
      res = (await axios.post(`https://api.telegram.org/bot${this.TOKEN}/${method}`, options, headers)).data
    }
    else
      res = (await axios.post(`https://api.telegram.org/bot${this.TOKEN}/${method}`, options)).data

    if (res && res.result && method != "getUpdates") {
      let result = res.result
      delete res.result;
      if (res.ok)
        delete res.ok;
      return { ...res, ...result }
    } else if (res) {
      return res;
    }
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
  send = async (chat: string | number | undefined, text:any, options: Options = {}) => {

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
  edit = async (chat: string | number | undefined, message_id: number | undefined, text: any, options:Options = {}) => {
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
  forword = async (chat: string | number | undefined, from_chat: string | number | undefined, message_id: number | undefined, options:Options = {}) => {
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
  copy = async (chat: string | number | undefined, from_chat: string | number | undefined, message_id: number | undefined, options:Options = {}) => {
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
  sendPhoto = async (chat: string | number | undefined, file:any, options:Options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    if (typeof file == "string")
      return console.error("sendPhoto: Please firstly import InputFile class and use in second param new InputFile(your file path, filename)")

    file.append('chat_id', chat);

    for (let key in options) {
      if (options.hasOwnProperty(key)) {
        let value = options[key];
        file.append(key, value);
      }
    }
    let headers = file.getHeaders()

    return await this.request("sendPhoto", file, headers)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} audio_link_or_id 
   * @param {any | undefined} options 
   * @returns 
   */
  sendAudio = async (chat: string | number | undefined, file:any, options:Options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    if (typeof file == "string")
      return console.error("sendAudio: Please firstly import InputFile class and use in second param new InputFile(your file path, filename)")

    file.append('chat_id', chat);

    for (let key in options) {
      if (options.hasOwnProperty(key)) {
        let value = options[key];
        file.append(key, value);
      }
    }
    let headers = file.getHeaders()

    return await this.request("sendAudio", file, headers)
  }


  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} video_link_or_id 
   * @param {any | undefined} options 
   * @returns 
   */
  sendVideo = async (chat: string | number | undefined, file:any, options:Options = {}) => {
    if (!chat)
      return console.error("Chat id required")
    if (typeof file == "string")
      return console.error("sendVideo: Please firstly import InputFile class and use in second param new InputFile(your file path, filename)")

    file.append('chat_id', chat);

    for (let key in options) {
      if (options.hasOwnProperty(key)) {
        let value = options[key];
        file.append(key, value);
      }
    }
    let headers = file.getHeaders()

    return await this.request("sendVideo", file, headers)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {*} latitude 
   * @param {*} longitude 
   * @param {any | undefined} options 
   * @returns 
   */
  sendLocation = async (chat: string | number | undefined, latitude:any, longitude:any, options:Options = {}) => {
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
  sendDoc = async (chat: string | number | undefined, doc:any, options:Options = {}) => {
    if (!chat)
      return console.error("Chat id required")

    if (typeof doc == "string")
      return console.error("sendDoc: Please firstly import InputFile class and use in second param new InputFile(your file path, filename)")

    doc.append('chat_id', chat);

    for (let key in options) {
      if (options.hasOwnProperty(key)) {
        let value = options[key];
        doc.append(key, value);
      }
    }
    let headers = doc.getHeaders()

    return await this.request("sendDocument", doc, headers)
  }

  /**
   * 
   * @param {string | number | undefined} chat  
   * @param {number | undefined } message_id  
   * @param {any | undefined} options 
   * @returns 
   */
  del = async (chat: string | number | undefined, message_id: number | undefined, options:Options = {}) => {
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
  sendVenue = async (chat: string | number | undefined, latitude:any, longitude:any, title:any, address:any, options:Options = {}) => {
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
  sendContact = async (chat: string | number | undefined, phone_number:any, first_name:any, options:Options = {}) => {
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
  sendPoll = async (chat: string | number | undefined, question:any, your_options:any, options:Options = {}) => {
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
  sendDice = async (chat: string | number | undefined, options:Options = {}) => {
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
  sendAction = async (chat: string | number | undefined, action:any, options:Options = {}) => {
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
  ban = async (chat: string | number | undefined, user_id:any, options:Options = {}) => {
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
  unban = async (chat: string | number | undefined, user_id:any, options:Options = {}) => {
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
  mute = async (chat: string | number | undefined, user_id:any, options:Options = {}) => {
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
  unmute = async (chat: string | number | undefined, user_id:any, options:Options = {}) => {
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
  promote = async (chat: string | number | undefined, user_id:any, options:Options = {}) => {
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
  demote = async (chat: string | number | undefined, user_id:any, options:Options = {}) => {
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
  exportChatInviteLink = async (chat: string | number | undefined, options:Options = {}) => {
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
  link = async (chat: string | number | undefined, options:Options = {}) => {
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
  revokeLink = async (chat: string | number | undefined, invite_link:any, options:Options = {}) => {
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
  approveJoinRequest = async (chat: string | number | undefined, user_id:any, options:Options = {}) => {
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
  declineJoinRequest = async (chat: string | number | undefined, user_id:any, options:Options = {}) => {
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
  pin = async (chat: string | number | undefined, message_id: number | undefined, options:Options = {}) => {
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
  unpin = async (chat: string | number | undefined, message_id: number | undefined, options:Options = {}) => {
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
  unpinAll = async (chat: string | number | undefined, options:Options = {}) => {
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
  leaveChat = async (chat: string | number | undefined, options:Options = {}) => {
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
  getChat = async (chat: string | number | undefined, options:Options = {}) => {
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
  getAdmins = async (chat: string | number | undefined, options:Options = {}) => {
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
  getMemberCount = async (chat: string | number | undefined, options:Options = {}) => {
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
  getMember = async (chat: string | number | undefined, user_id:any, options:Options = {}) => {
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
  getFile = async (file_id:any, options:Options = {}) => {
    options.file_id = file_id;
    return await this.request("getFile", options)
  }

  /**
   * 
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  getUserProfilePhotos = async (user_id:any, options:Options = {}) => {
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
  ansQuery = async (query_id:any, text:string | number | undefined, options:Options = {}) => {
    options.callback_query_id = query_id;
    if(text)
    options.text = text;
    return await this.request("answerCallbackQuery", options)
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
  deleteWebhook = async (drop_pending_updates:any = true) => {
    let options:Options = {};
    options.drop_pending_updates = drop_pending_updates;
    return await this.request("deleteWebhook", options)
  }

  /**
   * 
   * @param {*} msg 
   * @param {any | undefined} options 
   */
  error = (msg:any, options:Options = {}) => {
    throw console.error(msg)
  }


// let InputFile = require("./classes")
// module.exports = {InputFile}
}
