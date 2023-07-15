/// <reference types="node" />
import { EventEmitter } from 'events';
type Options = {
    [key: string]: any;
};
declare class Event extends EventEmitter {
    [key: string]: any;
    options: Options;
    TOKEN: any;
    offset: any;
    run: any;
    /**
     *
     * @param {string} TOKEN
     * @param {any | undefined} options
     */
    constructor(options?: any);
    /**
     *
     * @param method string
     * @param options object
     * @param headers
     * @returns any
     */
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
  * @param {*} cmd
  * @param {*} callback
  */
    command: (cmd: any, callback: any) => Promise<void>;
    /**
     *
     * @param callback
     */
    all: (callback: Function) => Promise<void>;
    /**
     *
     * @param {*} str
     * @param {*} callback
     */
    matches: (str: any, callback: any) => Promise<void>;
    enter: (listener: Function | boolean | string, options?: Options) => Promise<void>;
    /**
     *
     * @param {Function | string} listener
     * @example
     * // use function inside leave
     * echoScene.leave((msg, util)=> {
     * msg.send("Entered in echo scene")
     * })
     *
     * // Or directly pass string
     * echoScene.leave("Entered in echo scene")
     *
     */
    leave: (listener: Function | string, options?: Options) => Promise<void>;
    deleteWebhook: (drop_pending_updates?: any) => Promise<any>;
    /**
     *
     * @param {Function | string} listener
     * @param {Options} options
     * @example
     * // It will send message when msg startsWith /start command
     * // Simple
     * bot.start("Hello welcome!") // you can also pass sendMessage options in second param
     *
     * // You can use functions also
     * bot.start((msg, util)=> {
     * // Do here which you want
     * })
     */
    start: (listener: Function | string, options?: Options) => Promise<void>;
    /**
     *
     * @param {Function | string} listener
     * @param {Options} options
     * @example
     * // It will send message when msg startsWith /help command
     * // Simple
     * bot.help("use /abc command to see more!") // you can also pass sendMessage options in second param
     *
     * // You can use functions also
     * bot.help((msg, util)=> {
     * // Do here which you want
     * })
     */
    help: (listener: Function | string, options?: Options) => Promise<void>;
    stop: (options?: Options) => Promise<any>;
}
export default Event;
//# sourceMappingURL=event.d.ts.map