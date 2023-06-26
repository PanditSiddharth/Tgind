"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
class Util {
    constructor(res) {
        this.res = res;
    }
    /**
     *
     * @param seconds
     * @returns
     */
    async sleep(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }
    async del(message_id, delTime = 10) {
        try {
            await this.sleep(delTime);
            if (message_id)
                return await this.res.del(message_id);
            else
                return await this.res.del();
        }
        catch (error) {
            return false;
        }
    }
    /**
     *
     * @param message
     * @param options
     *
     * You can give your message and in second param
     * time to delete that message or in second you can add {"time": 10} // after 10 seconds message will be delete
     *
     */
    async send(message, options = {}) {
        try {
            let time = 10;
            if (typeof options === 'number')
                time = options;
            if (options.time) {
                time = options.time;
                delete options.time;
            }
            let m = await this.res.send(message, options);
            this.del(m.message_id, time);
        }
        catch (error) {
        }
    }
    /**
     *
     * @param str
     * @returns
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    /**
     *
     * @param min
     * @param max
     * @returns
     */
    randNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    /**
     *
     * @param obj
     * @returns
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    /**
     *
     * @param array
     * @returns
     *
     * @example
     * const nestedArray = [1, [2, [3, [4, 5], 6], 7], 8, [9, 10]];
     * const flattenedArray = flatten(nestedArray);
     * console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
     *
     */
    // flatten: Flattens a nested array into a single-level array.
    flatten(array) {
        return array.reduce((flat, item) => flat.concat(Array.isArray(item) ? this.flatten(item) : item), []);
    }
    /**
     *
     * @param obj
     * @param keys
     * @returns
     *
     * @example
     * const user = {
     * name: 'John',
     * age: 30,
     * email: 'john@example.com',
     *  address: '123 Main St',
     * };
     *
     * const picked = pick(user, ['name', 'email']);
     * console.log(picked); // Output: { name: 'John', email: 'john@example.com' }
     *
     */
    pick(obj, keys) {
        return keys.reduce((acc, key) => {
            if (obj.hasOwnProperty(key)) {
                acc[key] = obj[key];
            }
            return acc;
        }, {});
    }
}
exports.Util = Util;
