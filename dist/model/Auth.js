"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        unique: false,
        select: false
    },
    passwordConfirmation: {
        type: String,
        required: true,
        unique: false,
    },
    photo: [String],
    phone: [Number],
    address: {
        type: String,
        required: false,
        unique: false,
    },
    Country: [
        {
            type: String,
            required: false,
        }
    ],
    role: {
        type: String,
        enum: ['vendor', 'client', 'admin'],
        default: 'client'
    },
    StripeAccount: {
        tyep: String,
        required: false,
    },
    Favoritecategories: {
        type: String,
        enum: ['Tecnology', 'House', 'Book', 'Not Specified'],
        default: 'Not Specified'
    },
    status: {
        type: String,
        default: "Hi I'm A New User"
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, { versionKey: false });
class UserClass extends mongoose_1.default.Model {
    idAdmin() {
        return this.role === 'admin';
    }
    getJwt() {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.sign({ id: this._id }, 'secret', {
                expiresIn: '7d',
            }, (err, token) => {
                if (err) {
                    reject(err);
                }
                return resolve(token);
            });
        });
    }
    static getIdFromJwt(token) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, 'secret' || '', (err, decodedToken) => {
                if (err) {
                    return reject(err);
                }
                if (!decodedToken.id) {
                    return reject('No Id Found');
                }
                resolve(decodedToken.id);
            });
        });
    }
}
userSchema.loadClass(UserClass);
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=Auth.js.map