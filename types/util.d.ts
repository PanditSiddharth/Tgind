export declare class Util {
    res: any;
    constructor(res: any);
    /**
     *
     * @param seconds
     * @returns
     */
    sleep(seconds: number): Promise<unknown>;
    del(message_id: any, delTime?: number): Promise<any>;
    /**
     *
     * @param message
     * @param options
     *
     * You can give your message and in second param
     * time to delete that message or in second you can add {"time": 10} // after 10 seconds message will be delete
     *
     */
    send(message: string, options?: any): Promise<void>;
    /**
     *
     * @param str
     * @returns
     */
    capitalize(str: string): string;
    /**
     *
     * @param min
     * @param max
     * @returns
     */
    randNum(min: number, max: number): number;
    /**
     *
     * @param obj
     * @returns
     */
    deepClone(obj: Object): any;
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
    flatten(array: any): any;
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
    pick(obj: any, keys: any): any;
}
//# sourceMappingURL=util.d.ts.map