type Options = {
    [key: string]: any;
};
export declare class Short {
    [key: string]: any;
    private options;
    /**
     *
     * @param {any | undefined} options
     */
    constructor(options?: Options);
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
    request(method: string, options?: Options, headers?: Options): Promise<any>;
    /**
     *
     * @param { string } sceneName
     *
     * @example
     * msg.enter("greet")
     */
    enter(sceneName: string): Promise<void>;
    private __setLeave;
    leave(opk?: any): Promise<void>;
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
    send(text: any, options?: Options): Promise<any>;
    /**
     *
     * @param {number | undefined } message_id
     * @param {*} text
     * @param {any | undefined} options
     * @returns
     */
    edit(message_id: any, text: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} from_chat
     * @param {number | undefined } message_id
     * @param {any | undefined} options
     * @returns
     */
    forword(from_chat_id: any, message_id: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} from_chat
     * @param {number | undefined } message_id
     * @param {any | undefined} options
     * @returns
     */
    copy(from_chat_id: any, message_id: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} photo_link_or_id
     * @param {any | undefined} options
     * @returns
     */
    sendPhoto(file: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} audio_link_or_id
     * @param {any | undefined} options
     * @returns
     */
    sendAudio(file: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} video_link_or_id
     * @param {any | undefined} options
     * @returns
     */
    sendVideo(file: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} latitude
     * @param {*} longitude
     * @param {any | undefined} options
     * @returns
     */
    sendLocation(latitude: any, longitude: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} doc_link_or_id
     * @param {any | undefined} options
     * @returns
     */
    sendDoc(doc: any, options?: Options): Promise<any>;
    /**
     *
     * @param {number | undefined } message_id
     * @param {any | undefined} options
     * @returns
     */
    del(message_id: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} latitude
     * @param {*} longitude
     * @param {*} title
     * @param {*} address
     * @param {any | undefined} options
     * @returns
     */
    sendVenue(latitude: any, longitude: any, title: any, address: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} phone_number
     * @param {*} first_name
     * @param {any | undefined} options
     * @returns
     */
    sendContact(phone_number: any, first_name: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} question
     * @param {*} your_options
     * @param {any | undefined} options
     * @returns
     */
    sendPoll(question: any, your_options: any, options?: Options): Promise<any>;
    /**
     *
     * @param {any | undefined} options
     * @returns
     */
    sendDice(options?: Options): Promise<any>;
    /**
     *
     * @param {*} action
     * @param {any | undefined} options
     * @returns
     */
    sendAction(action: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    ban(user_id: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    unban(user_id: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    mute(user_id: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    unmute(user_id: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    promote(user_id: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    demote(user_id: any, options?: Options): Promise<any>;
    /**
     *
     * @param {any | undefined} options
     * @returns
     */
    exportChatInviteLink(options?: Options): Promise<any>;
    /**
     *
     * @param {any | undefined} options
     * @returns
     */
    link(options?: Options): Promise<any>;
    /**
     *
     * @param {*} invite_link
     * @param {any | undefined} options
     * @returns
     */
    revokeLink(invite_link: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    approveJoinRequest(user_id: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    declineJoinRequest(user_id: any, options?: Options): Promise<any>;
    /**
     *
     * @param {number | undefined } message_id
     * @param {any | undefined} options
     * @returns
     */
    pin(message_id: any, options?: Options): Promise<any>;
    /**
     *
     * @param {number | undefined } message_id
     * @param {any | undefined} options
     * @returns
     */
    unpin(message_id: any, options?: Options): Promise<any>;
    /**
     *
     * @param {any | undefined} options
     * @returns
     */
    unpinAll(options?: Options): Promise<any>;
    /**
     *
     * @param {any | undefined} options
     * @returns
     */
    leaveChat(options?: Options): Promise<any>;
    /**
     *
     * @param {any | undefined} options
     * @returns
     */
    getChat(options?: Options): Promise<any>;
    /**
     *
     * @param {any | undefined} options
     * @returns
     */
    getAdmins(options?: Options): Promise<any>;
    /**
     *
     * @param {any | undefined} options
     * @returns
     */
    getMemberCount(options?: Options): Promise<any>;
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    getMember(user_id: any, options?: Options): Promise<any>;
    /**
   *
   * @param {*} file_id
   * @param {any | undefined} options
   * @returns
   */
    getFile(file_id: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    getUserProfilePhotos(user_id: any, options?: Options): Promise<any>;
    /**
     *
     * @param {*} query_id
     * @param {*} options
     * @returns
     */
    ansQuery(text?: any, options?: Options): Promise<any>;
    getMe(): Promise<any>;
    /**
     *
     * @param {*} drop_pending_updates
     * @returns
     */
    deleteWebhook(drop_pending_updates?: any): Promise<any>;
}
export {};
//# sourceMappingURL=short.d.ts.map