"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
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
    size: {
        type: Number,
    },
    colorsAvailable: {
        type: String,
        default: 'Not Specified'
    },
    price: {
        type: Number,
        required: true,
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
    vendor: {
        ref: 'User',
        type: mongoose_1.Schema.Types.ObjectId,
        immutable: true,
    },
    scadenza: {
        type: Date,
        default: Date.now()
    },
}, { versionKey: false });
const Product = mongoose_1.default.model('Products', ProductsSchema);
exports.default = Product;
//# sourceMappingURL=Products.js.map