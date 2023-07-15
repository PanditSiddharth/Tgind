import axios from 'axios';
import { EventEmitter } from 'events';
import { Short } from '../short';
import { Util } from '../util';
type Options = { [key: string]: any; }
let opt: Options = {};

class Event extends EventEmitter {
  [key: string]: any;
  options: Options = {}
  TOKEN: any;
  offset: any;
  run: any;

  /**
   * 
   * @param {string} TOKEN 
   * @param {any | undefined} options 
   */

  constructor(options: any = {}) {
    super()
    if (options.TOKEN) {
      opt = this.options = options;
      this.TOKEN = options.TOKEN;
    }
    else
      options = opt

    if (options.timeout) {
      this.options = { timeout: options.timeout };
    } else {
      this.options = { timeout: 200000 };
    }
    this.options = { ...this.options, ...options };
  }

  /**
   * 
   * @param method string
   * @param options object
   * @param headers 
   * @returns any
   */
  request = async (method: string, options: any, headers: Options = {}) => {
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
  send = async (chat: string | number | undefined, text: any, options: Options = {}) => {

    if (!chat || !text)
      return console.error("Chat id and message_text required")
    options.chat_id = chat;
    options.text = text;
    return await this.request("sendMessage", options)
  }

  /**
* 
* @param {*} cmd 
* @param {*} callback 
*/
  command = async (cmd: any, callback: any) => {
    this.on("message", async (msg: any, util: any) => {

      if (!msg.text || !msg.text.startsWith("/"))
        return

      if (!cmd.startsWith('/'))
        cmd = "/" + cmd
      if (msg.text.match(new RegExp("^(" + cmd + ")", "i"))) {

        if (callback.length == 1)
          callback(msg)
        else
          callback(msg, util)
      }

    })
  }

  /**
   * 
   * @param callback 
   */
  all = async (callback: Function) => {
    this.on("all", async (msg: any, util: any) => {
      if (callback.length == 1)
        callback(msg)
      else
        callback(msg, util)
    })
  }

  /**
   * 
   * @param {*} str 
   * @param {*} callback 
   */
  matches = async (str: any, callback: any) => {
    this.on("message", async (msg: any, util: Util) => {
      if (!msg.text)
        return
      let mstr = msg.text.match(str)
      if (mstr) {
        Object.assign(msg, { "match": mstr })
        if (callback.length == 1)
          callback(msg)
        else
          callback(msg, util)
      }
    })
  }


  /*
   *
   * 
   * @param {Function | string} listener 
   * @example
   * // use function inside leave
   * echoScene.leave((msg, util)=> {
   * msg.send("Entered in echo scene")
   * })
   * 
   * // Or directly pass string
   * echoScene.enter("Entered in echo scene")
   * 
   * // Or if you want to spread this event to other liseners then
   * echoScene.enter(true)
   */
  enter = async (listener: Function | boolean | string, options: Options = {}) => {
    this.on("enter", async (msg: any, util: any) => {
      if (listener === true) {
        this.emit(msg.evnt, msg, util)
        this.emit("all", msg, util)
      } else if (listener === false) {
        // do nothing
      } else if(typeof listener === 'string'){
        msg.send(listener, options)
      }
      else if (listener.length == 1)
        listener(msg)
      else
        listener(msg, util)
    })
  }


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
  leave = async (listener: Function | string, options: Options = {}) => {
    this.on("leave", async (msg: any, util: any) => {
      if(typeof listener == "string")
       await msg.send(listener, options)
      else if (listener.length == 1)
        listener(msg)
      else
        listener(msg, util)
    })
  }

  // on(eventName: string | symbol, listener: (...args: any[]) => void): this {
  //   this.on(eventName,(short:any, util:any)=>{
  //     if(listener.length == 1)
  //     listener(short)
  //     else
  //     listener(short, util)
  //   })
  //   return this;
  // }

  // emit(eventName: string | symbol, ...args: any[]): boolean {
  //   super.emit(eventName, ...args)
  //   return false
  // }

  /*
  *
  * 
  * @param {*} drop_pending_updates 
  * @returns 
  */
  deleteWebhook = async (drop_pending_updates: any = true) => {
    let options: Options = {};
    options.drop_pending_updates = drop_pending_updates;
    return await this.request("deleteWebhook", options)
  }


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
  start = async (listener: Function | string, options:Options = {}) => {
    this.on("message", async (msg: any, util: any) => {
      if(!msg.text || !msg.text.startsWith("/start"))
      return;

      if(typeof listener == "string")
      await msg.send(listener, options)
     else if (listener.length == 1)
       listener(msg)
     else
       listener(msg, util)
    });
  }

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
  help = async (listener: Function | string, options:Options = {}) => {
    this.on("message", async (msg: any, util: any) => {
      if(!msg.text || !msg.text.startsWith("/help"))
      return;

      if(typeof listener == "string")
      await msg.send(listener, options)
     else if (listener.length == 1)
       listener(msg)
     else
       listener(msg, util)
    });
  }



  stop = async (options: Options = {}) => {
    this.run = false;
    return await this.deleteWebhook(true)
  }
}

export default Event;