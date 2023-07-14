"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const event_1 = __importDefault(require("./tg/event"));
const axios_1 = __importDefault(require("axios"));
class Scene extends event_1.default {
    constructor(sceneName, options = {}) {
        super();
        this.request = async (method, options, headers = {}) => {
            // let formData = {}
            // Object.assign(formData, this.formData)
            let res;
            if (Object.keys(headers).length > 0) {
                res = (await axios_1.default.post(`https://api.telegram.org/bot${this.TOKEN}/${method}`, options, headers)).data;
            }
            else
                res = (await axios_1.default.post(`https://api.telegram.org/bot${this.TOKEN}/${method}`, options)).data;
            if (res && res.result && method != "getUpdates") {
                let result = res.result;
                delete res.result;
                if (res.ok)
                    delete res.ok;
                return { ...res, ...result };
            }
            else if (res) {
                return res;
            }
        };
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
        this.send = async (chat, text, options = {}) => {
            if (!chat || !text)
                return this.error("Chat id and message_text required");
            options.chat_id = chat;
            options.text = text;
            return await this.request("sendMessage", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {number | undefined } message_id
         * @param {*} text
         * @param {any | undefined} options
         * @returns
         */
        this.edit = async (chat, message_id, text, options = {}) => {
            if (!chat || !text)
                return this.error("Chat id, message_id and message_text required");
            options.chat_id = chat;
            options.message_id = message_id;
            options.text = text;
            return await this.request("editMessageText", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} from_chat
         * @param {number | undefined } message_id
         * @param {any | undefined} options
         * @returns
         */
        this.forword = async (chat, from_chat, message_id, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.message_id = message_id;
            options.from_chat_id = from_chat;
            return await this.request("forwardMessage", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} from_chat
         * @param {number | undefined } message_id
         * @param {any | undefined} options
         * @returns
         */
        this.copy = async (chat, from_chat, message_id, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.message_id = message_id;
            options.from_chat_id = from_chat;
            return await this.request("copyMessage", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} photo_link_or_id
         * @param {any | undefined} options
         * @returns
         */
        this.sendPhoto = async (chat, file, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            if (typeof file == "string")
                return console.error("sendPhoto: Please firstly import InputFile class and use in second param new InputFile(your file path, filename)");
            file.append('chat_id', chat);
            for (let key in options) {
                if (options.hasOwnProperty(key)) {
                    let value = options[key];
                    file.append(key, value);
                }
            }
            let headers = file.getHeaders();
            return await this.request("sendPhoto", file, headers);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} audio_link_or_id
         * @param {any | undefined} options
         * @returns
         */
        this.sendAudio = async (chat, file, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            if (typeof file == "string")
                return console.error("sendAudio: Please firstly import InputFile class and use in second param new InputFile(your file path, filename)");
            file.append('chat_id', chat);
            for (let key in options) {
                if (options.hasOwnProperty(key)) {
                    let value = options[key];
                    file.append(key, value);
                }
            }
            let headers = file.getHeaders();
            return await this.request("sendAudio", file, headers);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} video_link_or_id
         * @param {any | undefined} options
         * @returns
         */
        this.sendVideo = async (chat, file, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            if (typeof file == "string")
                return console.error("sendVideo: Please firstly import InputFile class and use in second param new InputFile(your file path, filename)");
            file.append('chat_id', chat);
            for (let key in options) {
                if (options.hasOwnProperty(key)) {
                    let value = options[key];
                    file.append(key, value);
                }
            }
            let headers = file.getHeaders();
            return await this.request("sendVideo", file, headers);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} latitude
         * @param {*} longitude
         * @param {any | undefined} options
         * @returns
         */
        this.sendLocation = async (chat, latitude, longitude, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.latitude = latitude;
            options.longitude = longitude;
            return await this.request("sendLocation", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} doc_link_or_id
         * @param {any | undefined} options
         * @returns
         */
        this.sendDoc = async (chat, doc, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            if (typeof doc == "string")
                return console.error("sendDoc: Please firstly import InputFile class and use in second param new InputFile(your file path, filename)");
            doc.append('chat_id', chat);
            for (let key in options) {
                if (options.hasOwnProperty(key)) {
                    let value = options[key];
                    doc.append(key, value);
                }
            }
            let headers = doc.getHeaders();
            return await this.request("sendDocument", doc, headers);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {number | undefined } message_id
         * @param {any | undefined} options
         * @returns
         */
        this.del = async (chat, message_id, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.message_id = message_id;
            return await this.request("deleteMessage", options);
        };
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
        this.sendVenue = async (chat, latitude, longitude, title, address, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.latitude = latitude;
            options.longitude = longitude;
            options.title = title;
            options.address = address;
            return await this.request("sendVenue", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} phone_number
         * @param {*} first_name
         * @param {any | undefined} options
         * @returns
         */
        this.sendContact = async (chat, phone_number, first_name, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.phone_number = phone_number;
            options.first_name = first_name;
            return await this.request("sendContact", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} question
         * @param {*} your_options
         * @param {any | undefined} options
         * @returns
         */
        this.sendPoll = async (chat, question, your_options, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.question = question;
            options.options = your_options;
            return await this.request("sendPoll", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {any | undefined} options
         * @returns
         */
        this.sendDice = async (chat, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            return await this.request("sendDice", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} action
         * @param {any | undefined} options
         * @returns
         */
        this.sendAction = async (chat, action, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.action = action;
            return await this.request("sendChatAction", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} user_id
         * @param {any | undefined} options
         * @returns
         */
        this.ban = async (chat, user_id, options = {}) => {
            if (!chat)
                return this.error("Chat id");
            options.chat_id = chat;
            options.user_id = user_id;
            return await this.request("banChatMember", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} user_id
         * @param {any | undefined} options
         * @returns
         */
        this.unban = async (chat, user_id, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.user_id = user_id;
            return await this.request("unbanChatMember", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} user_id
         * @param {any | undefined} options
         * @returns
         */
        this.mute = async (chat, user_id, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.user_id = user_id;
            if (!options.permissions)
                options.permissions = { "can_send_messages": false };
            return await this.request("restrictChatMember", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} user_id
         * @param {any | undefined} options
         * @returns
         */
        this.unmute = async (chat, user_id, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.user_id = user_id;
            if (!options.permissions)
                options.permissions = { "can_send_messages": true };
            return await this.request("restrictChatMember", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} user_id
         * @param {any | undefined} options
         * @returns
         */
        this.promote = async (chat, user_id, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
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
            return await this.request("promoteChatMember", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} user_id
         * @param {any | undefined} options
         * @returns
         */
        this.demote = async (chat, user_id, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.user_id = user_id;
            if (!options.permissions)
                options.permissions = { "can_send_messages": true };
            return await this.request("setChatPermissions", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {any | undefined} options
         * @returns
         */
        this.exportChatInviteLink = async (chat, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            return await this.request("exportChatInviteLink", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {any | undefined} options
         * @returns
         */
        this.link = async (chat, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            return await this.request("createChatInviteLink", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} invite_link
         * @param {any | undefined} options
         * @returns
         */
        this.revokeLink = async (chat, invite_link, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.invite_link = invite_link;
            return await this.request("revokeChatInviteLink", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} user_id
         * @param {any | undefined} options
         * @returns
         */
        this.approveJoinRequest = async (chat, user_id, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.user_id = user_id;
            return await this.request("approveChatJoinRequest", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} user_id
         * @param {any | undefined} options
         * @returns
         */
        this.declineJoinRequest = async (chat, user_id, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.user_id = user_id;
            return await this.request("declineChatJoinRequest", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {number | undefined } message_id
         * @param {any | undefined} options
         * @returns
         */
        this.pin = async (chat, message_id, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.message_id = message_id;
            return await this.request("pinChatMessage", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {number | undefined } message_id
         * @param {any | undefined} options
         * @returns
         */
        this.unpin = async (chat, message_id, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.message_id = message_id;
            return await this.request("unpinChatMessage", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {any | undefined} options
         * @returns
         */
        this.unpinAll = async (chat, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            return await this.request("unpinAllChatMessages", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {any | undefined} options
         * @returns
         */
        this.leaveChat = async (chat, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            return await this.request("leaveChat", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {any | undefined} options
         * @returns
         */
        this.getChat = async (chat, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            return await this.request("getChat", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {any | undefined} options
         * @returns
         */
        this.getAdmins = async (chat, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            return await this.request("getChatAdministrators", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {any | undefined} options
         * @returns
         */
        this.getMemberCount = async (chat, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            return await this.request("getChatMemberCount", options);
        };
        /**
         *
         * @param {string | number | undefined} chat
         * @param {*} user_id
         * @param {any | undefined} options
         * @returns
         */
        this.getMember = async (chat, user_id, options = {}) => {
            if (!chat)
                return console.error("Chat id required");
            options.chat_id = chat;
            options.user_id = user_id;
            return await this.request("getChatMember", options);
        };
        /**
         *
         * @param {*} file_id
         * @param {any | undefined} options
         * @returns
         */
        this.getFile = async (file_id, options = {}) => {
            options.file_id = file_id;
            return await this.request("getFile", options);
        };
        /**
         *
         * @param {*} user_id
         * @param {any | undefined} options
         * @returns
         */
        this.getUserProfilePhotos = async (user_id, options = {}) => {
            if (!user_id)
                return console.error("User id required");
            options.user_id = user_id;
            return await this.request("getUserProfilePhotos", options);
        };
        /**
         *
         * @param {*} query_id
         * @param {*} options
         * @returns
         */
        this.ansQuery = async (query_id, text, options = {}) => {
            options.callback_query_id = query_id;
            if (text)
                options.text = text;
            return await this.request("answerCallbackQuery", options);
        };
        this.getMe = async () => {
            let options = {};
            return await this.request("getMe", options);
        };
        /**
         *
         * @param {*} drop_pending_updates
         * @returns
         */
        this.deleteWebhook = async (drop_pending_updates = true) => {
            let options = {};
            options.drop_pending_updates = drop_pending_updates;
            return await this.request("deleteWebhook", options);
        };
        /**
         *
         * @param {*} msg
         * @param {any | undefined} options
         */
        this.error = (msg, options = {}) => {
            throw console.error(msg);
        };
        this.sceneName = sceneName;
    }
}
exports.Scene = Scene;
