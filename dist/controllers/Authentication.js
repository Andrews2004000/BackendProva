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
exports.deletAccount = exports.getOneUser = exports.getAllUsers = exports.logOut = exports.upadteUser = exports.login = exports.signUp = void 0;
const Auth_1 = __importDefault(require("../model/Auth"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = __importDefault(require("../Error/AppError"));
function SendCookieToken(res, token) {
    if (token) {
        res.cookie(token, 'access_token', {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
    }
    else {
        res.cookie('access_token', {
            httpOnly: true,
            expires: Date.now()
        });
    }
}
exports.signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, email, password, confirmPassword, role } = req.body;
    if (!password) {
        throw new AppError_1.default('No Passowrd', 404);
    }
    const HashPassword = yield bcrypt_1.default.hash(password, 12);
    if (!HashPassword) {
        throw new AppError_1.default('No Passowrd', 404);
    }
    role = 'client';
    const newUser = yield Auth_1.default.create();
    if (!newUser) {
        throw new AppError_1.default('No Passowrd', 404);
    }
    const token = yield newUser.getJwt();
    SendCookieToken(res, token);
    res.status(200).json({
        status: 'Success',
        token,
        data: {
            newUser,
        }
    });
});
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email && password) {
        throw new AppError_1.default('No Passowrd', 404);
    }
    const user = yield Auth_1.default.findOne({ email }).select('+password');
    if (user && (yield bcrypt_1.default.compare(password, user.password))) {
        const token = yield user.getJwt();
        SendCookieToken(res, token);
        res.status(200).json({
            status: 'Success',
            token,
            data: {
                user
            }
        });
    }
});
exports.upadteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = req.user;
    if (!user) {
        throw new AppError_1.default('No Passowrd', 404);
    }
    const inputData = Object.assign({}, body);
    if (inputData.password) {
        inputData.password = yield bcrypt_1.default.hash(inputData.password, 12);
    }
    Object.keys(inputData).forEach((k) => {
        if (k in user) {
            user[k] = inputData[k];
        }
    });
    yield user.save();
    res.status(201).json({
        status: 'success',
        data: {
            user
        }
    });
});
exports.logOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    SendCookieToken(res);
    res.status(204).json({
        status: 'success',
        data: null
    });
});
exports.getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Auth_1.default.find();
    if (!users) {
        throw new AppError_1.default('No Passowrd', 404);
    }
    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    });
});
exports.getOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new AppError_1.default('No Passowrd', 404);
    }
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});
exports.deletAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new AppError_1.default('No Passowrd', 404);
    }
    const UserId = user.id;
    yield Auth_1.default.findByIdAndDelete(UserId);
    SendCookieToken(res);
    res.status(204).json({
        status: 'success',
        data: null
    });
});
//# sourceMappingURL=Authentication.js.map