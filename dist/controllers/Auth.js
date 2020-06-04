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
exports.restrictTo = exports.updateUser = exports.deleteUser = exports.updateUserStatus = exports.getUserStataus = exports.signUp = exports.login = void 0;
const Authentication_1 = __importDefault(require("../models/Authentication"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function sendJwtOnCookie(res, token) {
    if (token) {
        res.cookie('access_token', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        });
    }
    else {
        res.cookie('access_token', {
            httpOnly: true,
            expires: Date.now(),
        });
    }
}
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    const user = yield Authentication_1.default.findOne({ email: email });
    if (!user) {
        const err = new Error('No User With This email');
        err.statusCode = 401;
        throw err;
    }
    loadedUser = user;
    const isEqual = yield bcrypt_1.default.compare(password, user.password);
    if (!isEqual) {
        const err = new Error('No User With This password');
        err.statusCode = 401;
        throw err;
    }
    const token = jsonwebtoken_1.default.sign({
        email: loadedUser.email,
        user: loadedUser._id.toString(),
    }, 'myownsecretword', { expiresIn: '1h' });
    sendJwtOnCookie(res, token);
    res.status(200).json({ token: token, user: loadedUser._id.toString() });
});
exports.signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    const user = new Authentication_1.default({
        username: username,
        email: email,
        role: role,
        password: hashedPassword,
    });
    const result = yield user.save();
    sendJwtOnCookie(res);
    res.status(201).json({ message: 'User Create', user: result._id });
});
exports.getUserStataus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Authentication_1.default.findById(req.user);
    if (!user) {
        const error = new Error('User not found.');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json({ status: user.status });
});
exports.updateUserStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newStatus = req.body.status;
    const user = yield Authentication_1.default.findById(req.user);
    if (!user) {
        const error = new Error('User not found Sorry Bro.');
        error.statusCode = 404;
        throw error;
    }
    user.status = newStatus;
    yield user.save();
    res.status(200).json({ message: 'User Updated' });
});
exports.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Authentication_1.default.findByIdAndRemove(req.user);
    if (!user) {
        throw new Error('Nope Bro');
    }
    res.status(200).json({ message: 'Deleted User' });
});
exports.updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    Authentication_1.default.findByIdAndUpdate(req.user, { $set: req.body }, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log('RESULT: ' + result);
        res.status(200).json({ message: 'User Updated Correctly' });
    });
});
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (req.user && !roles.includes(req.user.role)) {
            const err = new Error('No Permission');
            return err;
        }
        next();
    };
};
///Comemevdvggcgcgsygygiggiiggg
//# sourceMappingURL=Auth.js.map