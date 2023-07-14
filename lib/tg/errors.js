"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramError = void 0;
class TelegramError extends Error {
    constructor(msg) {
        super(msg);
    }
}
exports.TelegramError = TelegramError;
