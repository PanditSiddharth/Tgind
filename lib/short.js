"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Short = void 0;
const axios_1 = __importDefault(require("axios"));
const errors_1 = require("./tg/errors");
const _1 = require(".");
let ss = {};
let TOKEN;
class Short {
    /**
     *
     * @param {any | undefined} options
     */
    constructor(options = {}) {
        this.options = {};
        TOKEN = options.TOKEN;
        Object.defineProperty(this, 'options', {
            value: options,
            enumerable: false
        });
    }
    /**
     *
     * @param {string} method
     * @param {Options} options
     * @param {Options} headers
     * @returns {Options}
     *
     * @example
     * bot.request("sendMessage", {chat_id: -100123456789, text: "Hi"})
     */
    async request(method, options = {}, headers = {}) {
        let res;
        if (Object.keys(headers).length > 0) {
            res = (await axios_1.default.post(`https://api.telegram.org/bot${TOKEN}/${method}`, options, headers)).data;
        }
        else
            res = (await axios_1.default.post(`https://api.telegram.org/bot${TOKEN}/${method}`, options)).data;
        if (res && res.result) {
            let result = res.result;
            delete res.result;
            if (res.ok)
                delete res.ok;
            return { ...res, ...result };
        }
        else if (res) {
            return res;
        }
    }
    /**
     *
     * @param { string } sceneName
     *
     * @example
     * msg.enter("greet")
     */
    async enter(sceneName) {
        if (!this.options.scene.hasOwnProperty(sceneName)) {
            throw new errors_1.TelegramError("Enter error: You have never registered this scene id");
        }
        let uid = this.options.from.id + "";
        this.options.session[uid] = { sceneName };
        ss[uid + ""] = { sceneName };
        if (ss.hasOwnProperty('timeoutId')) {
            clearTimeout(ss.timeoutId);
            delete ss.timeoutId;
        }
        let kkk = this.options.scene[this.options.session[this.options.from.id + ""].sceneName];
        let sh = Object.assign(this, this.options);
        delete sh.scene;
        delete sh.TOKEN;
        delete sh.session;
        delete sh.ttl;
        delete sh.evnt;
        let sh2 = new _1.Util(sh);
        kkk.emit(this.options.evnt, sh, sh2);
        kkk.emit('all', sh, sh2);
        this.__setLeave();
    }
    async __setLeave() {
        let ttl = 10;
        if (this.options.ttl)
            ttl = this.options.ttl;
        ttl = ttl * 1000;
        ss.timeoutId = setTimeout(() => {
            this.leave();
        }, ttl);
    }
    async leave() {
        delete this.options.session[this.options.from.id + ""];
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
     * bot.on("message", ctx  ctx.send("Hello"))
     */
    async send(text, options = {}) {
        if (!text)
            return console.error("Chat id and message_text required");
        options.chat_id = this.options.chat.id;
        options.text = text;
        return await this.request("sendMessage", options);
    }
    /**
     *
     * @param {number | undefined } message_id
     * @param {*} text
     * @param {any | undefined} options
     * @returns
     */
    async edit(message_id, text, options = {}) {
        options.chat_id = this.options.chat.id;
        options.message_id = message_id;
        options.text = text;
        return await this.request("editMessageText", options);
    }
    /**
     *
     * @param {*} from_chat
     * @param {number | undefined } message_id
     * @param {any | undefined} options
     * @returns
     */
    async forword(from_chat_id, message_id, options = {}) {
        options.chat_id = this.options.chat.id;
        options.message_id = message_id;
        options.from_chat_id = from_chat_id;
        return await this.request("forwardMessage", options);
    }
    /**
     *
     * @param {*} from_chat
     * @param {number | undefined } message_id
     * @param {any | undefined} options
     * @returns
     */
    async copy(from_chat_id, message_id, options = {}) {
        options.chat_id = this.options.chat.id;
        options.message_id = message_id;
        options.from_chat_id = from_chat_id;
        return await this.request("copyMessage", options);
    }
    /**
     *
     * @param {*} photo_link_or_id
     * @param {any | undefined} options
     * @returns
     */
    async sendPhoto(file, options = {}) {
        if (typeof file == "string")
            return console.error("sendPhoto: Please firstly import InputFile class and use in second param new InputFile(your file path, filename)");
        file.append('chat_id', this.options.chat.id);
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                let value = options[key];
                file.append(key, value);
            }
        }
        let headers = file.getHeaders();
        return await this.request("sendPhoto", file, headers);
    }
    /**
     *
     * @param {*} audio_link_or_id
     * @param {any | undefined} options
     * @returns
     */
    async sendAudio(file, options = {}) {
        if (typeof file == "string")
            return console.error("sendAudio: Please firstly import InputFile class and use in second param new InputFile(your file path, filename)");
        file.append('chat_id', this.options.chat.id);
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                let value = options[key];
                file.append(key, value);
            }
        }
        let headers = file.getHeaders();
        return await this.request("sendAudio", file, headers);
    }
    /**
     *
     * @param {*} video_link_or_id
     * @param {any | undefined} options
     * @returns
     */
    async sendVideo(file, options = {}) {
        if (typeof file == "string")
            return console.error("sendVideo: Please firstly import InputFile class and use in second param new InputFile(your file path, filename)");
        file.append('chat_id', this.options.chat.id);
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                let value = options[key];
                file.append(key, value);
            }
        }
        let headers = file.getHeaders();
        return await this.request("sendVideo", file, headers);
    }
    /**
     *
     * @param {*} latitude
     * @param {*} longitude
     * @param {any | undefined} options
     * @returns
     */
    async sendLocation(latitude, longitude, options = {}) {
        options.chat_id = this.options.chat.id;
        options.latitude = latitude;
        options.longitude = longitude;
        return await this.request("sendLocation", options);
    }
    /**
     *
     * @param {*} doc_link_or_id
     * @param {any | undefined} options
     * @returns
     */
    async sendDoc(doc, options = {}) {
        if (typeof doc == "string")
            return console.error("sendDoc: Please firstly import InputFile class and use in second param new InputFile(your file path, filename)");
        doc.append('chat_id', this.options.chat.id);
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                let value = options[key];
                doc.append(key, value);
            }
        }
        let headers = doc.getHeaders();
        return await this.request("sendDocument", doc, headers);
    }
    /**
     *
     * @param {number | undefined } message_id
     * @param {any | undefined} options
     * @returns
     */
    async del(message_id, options = {}) {
        options.chat_id = this.options.chat.id;
        if (message_id)
            options.message_id = message_id;
        else
            options.message_id = this.options.message_id;
        return await this.request("deleteMessage", options);
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
    async sendVenue(latitude, longitude, title, address, options = {}) {
        options.chat_id = this.options.chat.id;
        options.latitude = latitude;
        options.longitude = longitude;
        options.title = title;
        options.address = address;
        return await this.request("sendVenue", options);
    }
    /**
     *
     * @param {*} phone_number
     * @param {*} first_name
     * @param {any | undefined} options
     * @returns
     */
    async sendContact(phone_number, first_name, options = {}) {
        options.chat_id = this.options.chat.id;
        options.phone_number = phone_number;
        options.first_name = first_name;
        return await this.request("sendContact", options);
    }
    /**
     *
     * @param {*} question
     * @param {*} your_options
     * @param {any | undefined} options
     * @returns
     */
    async sendPoll(question, your_options, options = {}) {
        options.chat_id = this.options.chat.id;
        options.question = question;
        options.options = your_options;
        return await this.request("sendPoll", options);
    }
    /**
     *
     * @param {any | undefined} options
     * @returns
     */
    async sendDice(options = {}) {
        options.chat_id = this.options.chat.id;
        return await this.request("sendDice", options);
    }
    /**
     *
     * @param {*} action
     * @param {any | undefined} options
     * @returns
     */
    async sendAction(action, options = {}) {
        options.chat_id = this.options.chat.id;
        options.action = action;
        return await this.request("sendChatAction", options);
    }
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    async ban(user_id, options = {}) {
        return console.error("Chat id");
        options.chat_id = this.options.chat.id;
        options.user_id = user_id;
        return await this.request("banChatMember", options);
    }
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    async unban(user_id, options = {}) {
        options.chat_id = this.options.chat.id;
        options.user_id = user_id;
        return await this.request("unbanChatMember", options);
    }
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    async mute(user_id, options = {}) {
        options.chat_id = this.options.chat.id;
        options.user_id = user_id;
        if (!options.permissions)
            options.permissions = { "can_send_messages": false };
        return await this.request("restrictChatMember", options);
    }
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    async unmute(user_id, options = {}) {
        options.chat_id = this.options.chat.id;
        options.user_id = user_id;
        if (!options.permissions)
            options.permissions = { "can_send_messages": true };
        return await this.request("restrictChatMember", options);
    }
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    async promote(user_id, options = {}) {
        options.chat_id = this.options.chat.id;
        options.user_id = user_id;
        if (Object.keys(options).length < 3) {
            options.can_post_messages = true;
            options.can_delete_messages = true;
            options.can_pin_messages = true;
            options.can_restrict_members = true;
            options.can_manage_video_chats = true;
            options.can_invite_users = true;
        }
        return await this.request("promoteChatMember", options);
    }
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    async demote(user_id, options = {}) {
        options.chat_id = this.options.chat.id;
        options.user_id = user_id;
        options.can_promote_members = false;
        options.can_delete_messages = false;
        options.can_pin_messages = false;
        options.can_restrict_members = false;
        options.can_manage_video_chats = false;
        options.can_invite_users = false;
        options.can_manage_topics = false;
        options.can_change_info = false;
        return await this.request("promoteChatMember", options);
    }
    /**
     *
     * @param {any | undefined} options
     * @returns
     */
    async exportChatInviteLink(options = {}) {
        options.chat_id = this.options.chat.id;
        return await this.request("exportChatInviteLink", options);
    }
    /**
     *
     * @param {any | undefined} options
     * @returns
     */
    async link(options = {}) {
        options.chat_id = this.options.chat.id;
        return await this.request("createChatInviteLink", options);
    }
    /**
     *
     * @param {*} invite_link
     * @param {any | undefined} options
     * @returns
     */
    async revokeLink(invite_link, options = {}) {
        options.chat_id = this.options.chat.id;
        options.invite_link = invite_link;
        return await this.request("revokeChatInviteLink", options);
    }
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    async approveJoinRequest(user_id, options = {}) {
        options.chat_id = this.options.chat.id;
        options.user_id = user_id;
        return await this.request("approveChatJoinRequest", options);
    }
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    async declineJoinRequest(user_id, options = {}) {
        options.chat_id = this.options.chat.id;
        options.user_id = user_id;
        return await this.request("declineChatJoinRequest", options);
    }
    /**
     *
     * @param {number | undefined } message_id
     * @param {any | undefined} options
     * @returns
     */
    async pin(message_id, options = {}) {
        options.chat_id = this.options.chat.id;
        options.message_id = message_id;
        return await this.request("pinChatMessage", options);
    }
    /**
     *
     * @param {number | undefined } message_id
     * @param {any | undefined} options
     * @returns
     */
    async unpin(message_id, options = {}) {
        options.chat_id = this.options.chat.id;
        options.message_id = message_id;
        return await this.request("unpinChatMessage", options);
    }
    /**
     *
     * @param {any | undefined} options
     * @returns
     */
    async unpinAll(options = {}) {
        options.chat_id = this.options.chat.id;
        return await this.request("unpinAllChatMessages", options);
    }
    /**
     *
     * @param {any | undefined} options
     * @returns
     */
    async leaveChat(options = {}) {
        options.chat_id = this.options.chat.id;
        return await this.request("leaveChat", options);
    }
    /**
     *
     * @param {any | undefined} options
     * @returns
     */
    async getChat(options = {}) {
        options.chat_id = this.options.chat.id;
        return await this.request("getChat", options);
    }
    /**
     *
     * @param {any | undefined} options
     * @returns
     */
    async getAdmins(options = {}) {
        options.chat_id = this.options.chat.id;
        return await this.request("getChatAdministrators", options);
    }
    /**
     *
     * @param {any | undefined} options
     * @returns
     */
    async getMemberCount(options = {}) {
        options.chat_id = this.options.chat.id;
        return await this.request("getChatMemberCount", options);
    }
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    async getMember(user_id, options = {}) {
        options.chat_id = this.options.chat.id;
        options.user_id = user_id;
        return await this.request("getChatMember", options);
    }
    /**
   *
   * @param {*} file_id
   * @param {any | undefined} options
   * @returns
   */
    async getFile(file_id, options = {}) {
        options.file_id = file_id;
        return await this.request("getFile", options);
    }
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    async getUserProfilePhotos(user_id, options = {}) {
        if (!user_id)
            return console.error("User id required");
        options.user_id = user_id;
        return await this.request("getUserProfilePhotos", options);
    }
    /**
     *
     * @param {*} query_id
     * @param {*} options
     * @returns
     */
    async ansQuery(text = null, options = {}) {
        options.callback_query_id = this.options.id;
        if (text)
            options.text = text;
        return await this.request("answerCallbackQuery", options);
    }
    async getMe() {
        let options = {};
        return await this.request("getMe", options);
    }
    /**
     *
     * @param {*} drop_pending_updates
     * @returns
     */
    async deleteWebhook(drop_pending_updates = true) {
        let options = {};
        options.drop_pending_updates = drop_pending_updates;
        return await this.request("deleteWebhook", options);
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
        return Object.assign({}, this);
    }
}
exports.Short = Short;
