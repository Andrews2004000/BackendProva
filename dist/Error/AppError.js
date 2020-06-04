"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = default_1;
//# sourceMappingURL=AppError.js.map