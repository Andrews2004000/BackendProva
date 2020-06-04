"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    FavoriteCategories: {
        type: String
    },
    role: {
        type: String,
        enum: ['client', 'vendor', 'admin'],
        default: 'client',
    },
    status: {
        type: String,
        default: 'Hi Im Am New'
    }
});
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=Authentication.js.map