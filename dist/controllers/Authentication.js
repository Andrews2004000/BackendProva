"use strict";
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
        res.cookie('access_token', token, {
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
exports.signUp = async (req, res, next) => {
    const userData = { ...req.body };
    if (!userData.password) {
        throw new AppError_1.default('No Passowrd', 404);
    }
    const HashPassword = await bcrypt_1.default.hash(userData.password, 12);
    if (!HashPassword) {
        throw new AppError_1.default('No Passowrd', 404);
    }
    userData.role = 'client';
    const newUser = await Auth_1.default.create(userData);
    const token = await newUser.getJwt();
    SendCookieToken(res, token);
    res.status(200).json({
        status: 'Success',
        token,
        data: {
            newUser,
        }
    });
};
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && !password) {
        throw new AppError_1.default('No Passowrd', 404);
    }
    const user = await Auth_1.default.findOne({ email }).select('+password');
    if (user && (await bcrypt_1.default.compare(password, user.password))) {
        const token = await user.getJwt();
        SendCookieToken(res, token);
        res.status(200).json({
            status: 'Success',
            token,
            data: user
        });
    }
    else {
        throw new AppError_1.default('Incorrect', 401);
    }
};
exports.upadteUser = async (req, res, next) => {
    const body = req.body;
    const user = req.user;
    if (!user) {
        throw new AppError_1.default('No Passowrd', 404);
    }
    const inputData = { ...body };
    if (inputData.password) {
        inputData.password = await bcrypt_1.default.hash(inputData.password, 12);
    }
    Object.keys(inputData).forEach((k) => {
        if (k in user) {
            user[k] = inputData[k];
        }
    });
    await user.save();
    res.status(201).json({
        status: 'success',
        data: {
            user
        }
    });
};
exports.logOut = async (req, res, next) => {
    SendCookieToken(res);
    res.status(204).json({
        status: 'success',
        data: null
    });
};
exports.getAllUsers = async (req, res, next) => {
    const users = await Auth_1.default.find();
    if (!users) {
        throw new AppError_1.default('No Passowrd', 404);
    }
    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    });
};
exports.getOneUser = async (req, res, next) => {
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
};
exports.deletAccount = async (req, res, next) => {
    const user = req.user;
    if (!user) {
        throw new AppError_1.default('No Passowrd', 404);
    }
    const UserId = user.id;
    await Auth_1.default.findByIdAndDelete(UserId);
    SendCookieToken(res);
    res.status(204).json({
        status: 'success',
        data: null
    });
};
//# sourceMappingURL=Authentication.js.map