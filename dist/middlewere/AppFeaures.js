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
exports.restrictRole = exports.protect = void 0;
const Auth_1 = __importDefault(require("../model/Auth"));
const AppError_1 = __importDefault(require("../Error/AppError"));
exports.protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.token;
    if (!token) {
        throw new AppError_1.default('You have no Permissions', 404);
    }
    const id = yield Auth_1.default.getIdFromJwt(token);
    const currentUser = yield Auth_1.default.findById(id);
    if (!currentUser) {
        throw new AppError_1.default('You have no Permissions', 404);
    }
    req.user = currentUser;
    next();
});
exports.restrictRole = (...roles) => {
    const handler = (req, res, next) => {
        const user = req.user;
        if (user && !roles.includes(user.role)) {
            throw new AppError_1.default('You have no Permissions', 404);
        }
        next();
    };
    return handler;
};
//# sourceMappingURL=AppFeaures.js.map