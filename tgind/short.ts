
import axios from 'axios'
import { EventEmitter } from 'form-data';
type Options = { [key: string]: any; }
let ss:Options = {};

export class TgindShort {
  [key: string]: any;
  private options: Options = {};
  private TOKEN: string;
  private offset: number;
  /**
   * 
   * @param {string} TOKEN 
   * @param {any | undefined} options 
   */
  constructor(TOKEN: string, options: Options = {}) {
    // Object.keys(options).forEach((key)=>{
    //   this[key] = options[key]
    // })

    this.TOKEN = TOKEN;
    this.options = options;
    this.offset = 0;
  }

  request = async (method: string, options: Options = {}, headers: Options = {}) => {
    // let formData = {}
    // Object.assign(formData, this.formData)
    let res;

    if (Object.keys(headers).length > 0) {
      res = (await axios.post(`https://api.telegram.org/bot${this.TOKEN}/${method}`, options, headers)).data
    }
    else
      res = (await axios.post(`https://api.telegram.org/bot${this.TOKEN}/${method}`, options)).data

    if (res && res.result) {
      let result = res.result
      delete res.result;
      if (res.ok)
        delete res.ok;
      return { ...res, ...result }
    } else if (res) {
      return res;
    }
  }

  enter = async (sceneName:any) => {
    let uid = this.options.from.id + ""
    this.options.session[uid] = {sceneName}
    ss[uid + ""] = {sceneName}

    if(ss.hasOwnProperty('timeoutId')){
      clearTimeout(ss.timeoutId)
      delete ss.timeoutId
    }
    this.__setLeave()
  }

 __setLeave = async () => {
  let ttl:any = 10
  if(this.options.ttl)
  ttl = this.options.ttl
  ttl = ttl * 1000

  ss.timeoutId = setTimeout(() => {
    this.leave()
  }, ttl);
  // console.log(sa)

}

  leave = () => {
    delete this.options.session[this.options.from.id + ""]
  }

  /**
   * 

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
  send = async (text: any, options: Options = {}) => {

    if (!text)
      return console.error("Chat id and message_text required")
    options.chat_id = this.options.chat.id
    options.text = text;
    return await this.request("sendMessage", options)
  }

  /**
   *  
   * @param {number | undefined } message_id  
   * @param {*} text 
   * @param {any | undefined} options 
   * @returns 
   */
  edit = async (message_id: any, text: any, options: Options = {}) => {
    options.chat_id = this.options.chat.id
    options.message_id = message_id;
    options.text = text;
    return await this.request("editMessageText", options)
  }

  /**
   *  
   * @param {*} from_chat 
   * @param {number | undefined } message_id  
   * @param {any | undefined} options 
   * @returns 
   */
  forword = async (from_chat_id: any, message_id: any, options: Options = {}) => {


    options.chat_id = this.options.chat.id
    options.message_id = message_id;
    options.from_chat_id = from_chat_id;
    return await this.request("forwardMessage", options)
  }

  /**
   *  
   * @param {*} from_chat 
   * @param {number | undefined } message_id 
   * @param {any | undefined} options 
   * @returns 
   */
  copy = async (from_chat_id: any, message_id: any, options: Options = {}) => {

    options.chat_id = this.options.chat.id
    options.message_id = message_id;
    options.from_chat_id = from_chat_id;
    return await this.request("copyMessage", options)
  }

  /**
   *  
   * @param {*} photo_link_or_id 
   * @param {any | undefined} options 
   * @returns 
   */
  sendPhoto = async (file: any, options: Options = {}) => {


    if (typeof file == "string")
      return console.error("sendPhoto: Please firstly import InputFile class and use in second param new InputFile(your file path, filename)")

    file.append('chat_id', this.options.chat.id);

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
   * @param {*} audio_link_or_id 
   * @param {any | undefined} options 
   * @returns 
   */
  sendAudio = async (file: any, options: Options = {}) => {


    if (typeof file == "string")
      return console.error("sendAudio: Please firstly import InputFile class and use in second param new InputFile(your file path, filename)")

    file.append('chat_id', this.options.chat.id);

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
   * @param {*} video_link_or_id 
   * @param {any | undefined} options 
   * @returns 
   */
  sendVideo = async (file: any, options: Options = {}) => {


    if (typeof file == "string")
      return console.error("sendVideo: Please firstly import InputFile class and use in second param new InputFile(your file path, filename)")

    file.append('chat_id', this.options.chat.id);

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
   * @param {*} latitude 
   * @param {*} longitude 
   * @param {any | undefined} options 
   * @returns 
   */
  sendLocation = async (latitude: any, longitude: any, options: Options = {}) => {


    options.chat_id = this.options.chat.id
    options.latitude = latitude;
    options.longitude = longitude;
    return await this.request("sendLocation", options)
  }

  /**
   *  
   * @param {*} doc_link_or_id 
   * @param {any | undefined} options 
   * @returns 
   */
  sendDoc = async (doc: any, options: Options = {}) => {



    if (typeof doc == "string")
      return console.error("sendDoc: Please firstly import InputFile class and use in second param new InputFile(your file path, filename)")

    doc.append('chat_id', this.options.chat.id);

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
   * @param {number | undefined } message_id  
   * @param {any | undefined} options 
   * @returns 
   */
  del = async (message_id: any, options: Options = {}) => {
    options.chat_id = this.options.chat.id
    if (message_id)
      options.message_id = message_id;
    else
      options.message_id = this.options.message_id
    return await this.request("deleteMessage", options)
  }


  /**
   *  
   * @param {*} latitude 
   * @param {*} longitude 
   * @param {*} title 
   * @param {*} address 
   * @param {any | undefined} options 
   * @returns 
   */
  sendVenue = async (latitude: any, longitude: any, title: any, address: any, options: Options = {}) => {

    options.chat_id = this.options.chat.id
    options.latitude = latitude;
    options.longitude = longitude;
    options.title = title;
    options.address = address;
    return await this.request("sendVenue", options)
  }

  /**
   *  
   * @param {*} phone_number 
   * @param {*} first_name 
   * @param {any | undefined} options 
   * @returns 
   */
  sendContact = async (phone_number: any, first_name: any, options: Options = {}) => {
    options.chat_id = this.options.chat.id
    options.phone_number = phone_number;
    options.first_name = first_name;
    return await this.request("sendContact", options)
  }

  /**
   *  
   * @param {*} question 
   * @param {*} your_options 
   * @param {any | undefined} options 
   * @returns 
   */
  sendPoll = async (question: any, your_options: any, options: Options = {}) => {

    options.chat_id = this.options.chat.id
    options.question = question;
    options.options = your_options;
    return await this.request("sendPoll", options)
  }

  /**
   *  
   * @param {any | undefined} options 
   * @returns 
   */
  sendDice = async (options: Options = {}) => {

    options.chat_id = this.options.chat.id
    return await this.request("sendDice", options)
  }

  /**
   *  
   * @param {*} action 
   * @param {any | undefined} options 
   * @returns 
   */
  sendAction = async (action: any, options: Options = {}) => {

    options.chat_id = this.options.chat.id
    options.action = action;
    return await this.request("sendChatAction", options)
  }

  /**
   *  
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  ban = async (user_id: any, options: Options = {}) => {

    return console.error("Chat id")
    options.chat_id = this.options.chat.id
    options.user_id = user_id;
    return await this.request("banChatMember", options)
  }

  /**
   *  
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  unban = async (user_id: any, options: Options = {}) => {


    options.chat_id = this.options.chat.id
    options.user_id = user_id;
    return await this.request("unbanChatMember", options)
  }

  /**
   *  
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  mute = async (user_id: any, options: Options = {}) => {



    options.chat_id = this.options.chat.id
    options.user_id = user_id;
    if (!options.permissions)
      options.permissions = { "can_send_messages": false }

    return await this.request("restrictChatMember", options)
  }

  /**
   *  
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  unmute = async (user_id: any, options: Options = {}) => {



    options.chat_id = this.options.chat.id
    options.user_id = user_id;
    if (!options.permissions)
      options.permissions = { "can_send_messages": true }

    return await this.request("restrictChatMember", options)
  }

  /**
   *  
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  promote = async (user_id: any, options: Options = {}) => {


    options.chat_id = this.options.chat.id
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
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  demote = async (user_id: any, options: Options = {}) => {

    options.chat_id = this.options.chat.id
    options.user_id = user_id;

    options.can_promote_members = false
    options.can_delete_messages = false;
    options.can_pin_messages = false;
    options.can_restrict_members = false;
    options.can_manage_video_chats = false;
    options.can_invite_users = false;
    options.can_manage_topics = false;
    options.can_change_info = false
    return await this.request("promoteChatMember", options)
  }

  /**
   *  
   * @param {any | undefined} options 
   * @returns 
   */
  exportChatInviteLink = async (options: Options = {}) => {


    options.chat_id = this.options.chat.id
    return await this.request("exportChatInviteLink", options)
  }

  /**
   *  
   * @param {any | undefined} options 
   * @returns 
   */
  link = async (options: Options = {}) => {


    options.chat_id = this.options.chat.id
    return await this.request("createChatInviteLink", options)
  }

  /**
   *  
   * @param {*} invite_link 
   * @param {any | undefined} options 
   * @returns 
   */
  revokeLink = async (invite_link: any, options: Options = {}) => {


    options.chat_id = this.options.chat.id
    options.invite_link = invite_link;
    return await this.request("revokeChatInviteLink", options)
  }

  /**
   *  
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  approveJoinRequest = async (user_id: any, options: Options = {}) => {


    options.chat_id = this.options.chat.id
    options.user_id = user_id;
    return await this.request("approveChatJoinRequest", options)
  }

  /**
   *  
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  declineJoinRequest = async (user_id: any, options: Options = {}) => {


    options.chat_id = this.options.chat.id
    options.user_id = user_id;
    return await this.request("declineChatJoinRequest", options)
  }

  /**
   *  
   * @param {number | undefined } message_id  
   * @param {any | undefined} options 
   * @returns 
   */
  pin = async (message_id: any, options: Options = {}) => {


    options.chat_id = this.options.chat.id
    options.message_id = message_id;
    return await this.request("pinChatMessage", options)
  }

  /**
   *  
   * @param {number | undefined } message_id  
   * @param {any | undefined} options 
   * @returns 
   */
  unpin = async (message_id: any, options: Options = {}) => {


    options.chat_id = this.options.chat.id
    options.message_id = message_id;
    return await this.request("unpinChatMessage", options)
  }

  /**
   *  
   * @param {any | undefined} options 
   * @returns 
   */
  unpinAll = async (options: Options = {}) => {


    options.chat_id = this.options.chat.id
    return await this.request("unpinAllChatMessages", options)
  }

  /**
   *  
   * @param {any | undefined} options 
   * @returns 
   */
  leaveChat = async (options: Options = {}) => {


    options.chat_id = this.options.chat.id
    return await this.request("leaveChat", options)
  }

  /**
   *  
   * @param {any | undefined} options 
   * @returns 
   */
  getChat = async (options: Options = {}) => {


    options.chat_id = this.options.chat.id
    return await this.request("getChat", options)
  }

  /**
   *  
   * @param {any | undefined} options 
   * @returns 
   */
  getAdmins = async (options: Options = {}) => {


    options.chat_id = this.options.chat.id
    return await this.request("getChatAdministrators", options)
  }

  /**
   *  
   * @param {any | undefined} options 
   * @returns 
   */
  getMemberCount = async (options: Options = {}) => {


    options.chat_id = this.options.chat.id
    return await this.request("getChatMemberCount", options)
  }

  /**
   *  
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  getMember = async (user_id: any, options: Options = {}) => {

    options.chat_id = this.options.chat.id
    options.user_id = user_id;
    return await this.request("getChatMember", options)
  }

  /**
 * 
 * @param {*} file_id 
 * @param {any | undefined} options 
 * @returns 
 */
  getFile = async (file_id: any, options: Options = {}) => {
    options.file_id = file_id;
    return await this.request("getFile", options)
  }

  /**
   * 
   * @param {*} user_id 
   * @param {any | undefined} options 
   * @returns 
   */
  getUserProfilePhotos = async (user_id: any, options: Options = {}) => {
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
  ansQuery = async (text: any = null, options: Options = {}) => {
    options.callback_query_id = this.options.id;
    if (text)
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
  deleteWebhook = async (drop_pending_updates: any = true) => {
    let options: Options = {};
    options.drop_pending_updates = drop_pending_updates;
    return await this.request("deleteWebhook", options)
  }
}

