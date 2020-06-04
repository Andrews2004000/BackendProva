"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductsSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    tags: {
        type: [String]
    },
    category: {
        type: String,
        enum: ['Tecnology', 'House', 'Book', 'Not Specified'],
        default: 'Not Specified'
    },
    ratings: {
        type: Number,
        required: true
    },
    MaxQuantity: {
        required: true,
        type: Number,
    },
    scadenza: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false });
const Product = mongoose_1.default.model('Products', ProductsSchema);
exports.default = Product;
//# sourceMappingURL=Products.js.map