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
    deleteWebhook: (drop_pending_updates?: any) => Promise<any>;
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
    stop: (options?: Options) => Promise<any>;
}
export default Event;
//# sourceMappingURL=event.d.ts.map