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
exports.mongooseconnect = void 0;
const DB = 'mongodb+srv://Andrew:Dalida@cluster0-rsstj.mongodb.net/user?retryWrites=true&w=majority' || '';
const mongoose_1 = __importDefault(require("mongoose"));
function mongooseconnect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Connecting to database');
            yield mongoose_1.default.connect(DB, {
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
    });
}
exports.mongooseconnect = mongooseconnect;
//# sourceMappingURL=database.js.map