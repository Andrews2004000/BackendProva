"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Authentication_1 = __importDefault(require("../modules/Authentication"));
exports.isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const err = new Error('Not Authorized');
        err.statusCode = 422;
        throw err;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, 'myownsecretword');
    }
    catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated !!!!');
        error.statusCode = 401;
        throw error;
    }
    const user = yield Authentication_1.default.findById(decodedToken.userId);
    if (!user) {
        throw new Error('Cannt find User');
    }
    req.user = user;
    next();
});
exports.default = exports.isAuth;
//# sourceMappingURL=is-auth.js.map