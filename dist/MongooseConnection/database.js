"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseconnect = void 0;
const DB = 'mongodb+srv://Andrew:Dalida@cluster0-rsstj.mongodb.net/user?retryWrites=true&w=majority' || '';
const mongoose_1 = __importDefault(require("mongoose"));
async function mongooseconnect() {
    try {
        console.log('Connecting to database');
        await mongoose_1.default.connect(DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log('Connected');
    }
    catch (error) {
        console.log(error);
    }
}
exports.mongooseconnect = mongooseconnect;
//# sourceMappingURL=database.js.map