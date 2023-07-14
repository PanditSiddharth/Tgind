import Event from './tg/event';
type Options = {
    [key: string]: any;
};
export declare class Tgind extends Event {
    scene: any;
    /**
     *
     * @param {string} TOKEN
     * @param {any | undefined} options
     */
    constructor(TOKEN: any, options?: {
        start?: boolean;
        scene?: any;
        ttl?: any;
        timeout?: any;
        dropUpdates?: any;
    });
    request: (method: string, options: any, headers?: Options) => Promise<any>;
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
    send: (chat: string | number | undefined, text: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {number | undefined } message_id
     * @param {*} text
     * @param {any | undefined} options
     * @returns
     */
    edit: (chat: string | number | undefined, message_id: number | undefined, text: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} from_chat
     * @param {number | undefined } message_id
     * @param {any | undefined} options
     * @returns
     */
    forword: (chat: string | number | undefined, from_chat: string | number | undefined, message_id: number | undefined, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} from_chat
     * @param {number | undefined } message_id
     * @param {any | undefined} options
     * @returns
     */
    copy: (chat: string | number | undefined, from_chat: string | number | undefined, message_id: number | undefined, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} photo_link_or_id
     * @param {any | undefined} options
     * @returns
     */
    sendPhoto: (chat: string | number | undefined, file: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} audio_link_or_id
     * @param {any | undefined} options
     * @returns
     */
    sendAudio: (chat: string | number | undefined, file: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} video_link_or_id
     * @param {any | undefined} options
     * @returns
     */
    sendVideo: (chat: string | number | undefined, file: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} latitude
     * @param {*} longitude
     * @param {any | undefined} options
     * @returns
     */
    sendLocation: (chat: string | number | undefined, latitude: any, longitude: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} doc_link_or_id
     * @param {any | undefined} options
     * @returns
     */
    sendDoc: (chat: string | number | undefined, doc: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {number | undefined } message_id
     * @param {any | undefined} options
     * @returns
     */
    del: (chat: string | number | undefined, message_id: number | undefined, options?: Options) => Promise<any>;
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
    sendVenue: (chat: string | number | undefined, latitude: any, longitude: any, title: any, address: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} phone_number
     * @param {*} first_name
     * @param {any | undefined} options
     * @returns
     */
    sendContact: (chat: string | number | undefined, phone_number: any, first_name: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} question
     * @param {*} your_options
     * @param {any | undefined} options
     * @returns
     */
    sendPoll: (chat: string | number | undefined, question: any, your_options: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {any | undefined} options
     * @returns
     */
    sendDice: (chat: string | number | undefined, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} action
     * @param {any | undefined} options
     * @returns
     */
    sendAction: (chat: string | number | undefined, action: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    ban: (chat: string | number | undefined, user_id: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    unban: (chat: string | number | undefined, user_id: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    mute: (chat: string | number | undefined, user_id: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    unmute: (chat: string | number | undefined, user_id: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    promote: (chat: string | number | undefined, user_id: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    demote: (chat: string | number | undefined, user_id: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {any | undefined} options
     * @returns
     */
    exportChatInviteLink: (chat: string | number | undefined, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {any | undefined} options
     * @returns
     */
    link: (chat: string | number | undefined, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} invite_link
     * @param {any | undefined} options
     * @returns
     */
    revokeLink: (chat: string | number | undefined, invite_link: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    approveJoinRequest: (chat: string | number | undefined, user_id: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    declineJoinRequest: (chat: string | number | undefined, user_id: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {number | undefined } message_id
     * @param {any | undefined} options
     * @returns
     */
    pin: (chat: string | number | undefined, message_id: number | undefined, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {number | undefined } message_id
     * @param {any | undefined} options
     * @returns
     */
    unpin: (chat: string | number | undefined, message_id: number | undefined, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {any | undefined} options
     * @returns
     */
    unpinAll: (chat: string | number | undefined, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {any | undefined} options
     * @returns
     */
    leaveChat: (chat: string | number | undefined, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {any | undefined} options
     * @returns
     */
    getChat: (chat: string | number | undefined, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {any | undefined} options
     * @returns
     */
    getAdmins: (chat: string | number | undefined, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {any | undefined} options
     * @returns
     */
    getMemberCount: (chat: string | number | undefined, options?: Options) => Promise<any>;
    /**
     *
     * @param {string | number | undefined} chat
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    getMember: (chat: string | number | undefined, user_id: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {*} file_id
     * @param {any | undefined} options
     * @returns
     */
    getFile: (file_id: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {*} user_id
     * @param {any | undefined} options
     * @returns
     */
    getUserProfilePhotos: (user_id: any, options?: Options) => Promise<any>;
    /**
     *
     * @param {*} query_id
     * @param {*} options
     * @returns
     */
    ansQuery: (query_id: any, text: string | number | undefined, options?: Options) => Promise<any>;
    getMe: () => Promise<any>;
    /**
     *
     * @param {*} drop_pending_updates
     * @returns
     */
    deleteWebhook: (drop_pending_updates?: any) => Promise<any>;
    /**
     *
     * @param {*} msg
     * @param {any | undefined} options
     */
    error: (msg: any, options?: Options) => never;
    /**
     *
     * @param {string | number } str
     * @returns
     */
    start: (str: any) => Promise<void>;
    /**
     *
     * @param {string | number } str
     */
    help: (str: any) => Promise<void>;
    /**
     *
     * @param {*} update
     * @param {any | undefined} options
     * @returns
     */
    handleUpdate: (update: Options, options?: Options) => Promise<void>;
    launch: (options?: Options) => Promise<false | undefined>;
}
export {};
//# sourceMappingURL=tgind.d.ts.map