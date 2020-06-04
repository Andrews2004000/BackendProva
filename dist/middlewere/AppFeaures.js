"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictRole = exports.protect = void 0;
const Auth_1 = __importDefault(require("../model/Auth"));
const AppError_1 = __importDefault(require("../Error/AppError"));
exports.protect = async (req, res, next) => {
    const token = req.token;
    if (!token) {
        throw new AppError_1.default('You have no Permissions', 404);
    }
    const id = await Auth_1.default.getIdFromJwt(token);
    const currentUser = await Auth_1.default.findById(id);
    if (!currentUser) {
        throw new AppError_1.default('You have no Permissions', 404);
    }
    req.user = currentUser;
    next();
};
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