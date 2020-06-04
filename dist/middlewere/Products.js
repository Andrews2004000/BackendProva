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
exports.updateProduct = exports.deleteProduct = exports.CreateProduct = exports.getProduct = exports.getProducts = void 0;
const Products_1 = __importDefault(require("../modules/Products"));
const Authentication_1 = __importDefault(require("../modules/Authentication"));
exports.getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Products_1.default.find();
    if (!products) {
        const err = new Error('No Products');
        err.statusCode = 422;
        throw err;
    }
    res.status(200).json({ message: 'You Are Getting A Product', products: products });
});
exports.getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const product = yield Products_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (!product) {
        const err = new Error('No Products');
        err.statusCode = 422;
        throw err;
    }
    res.status(200).json({ message: 'One Product', product: product });
});
exports.CreateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const scadenza = req.body.scadenza;
    const ratings = req.body.ratings;
    const MaxQuantity = req.body.MaxQuantity;
    const products = new Products_1.default({
        title: title,
        description: description,
        price: price,
        category: category,
        scadenza: scadenza,
        ratings: ratings,
        MaxQuantity: MaxQuantity,
    });
    yield products.save();
    const user = yield Authentication_1.default.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
    user.product.push(products);
    res.status(200).json({
        message: 'Post Created',
        product: products,
        creator: { _id: user._id, username: user.username },
    });
});
exports.deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const prodId = req.params.prodId;
    const product = yield Products_1.default.findByIdAndRemove(prodId);
    if (!product) {
        const err = new Error('Could not find post.');
        err.statusCode = 404;
        throw err;
    }
    if (product.creator.toString() !== ((_c = req.user) === null || _c === void 0 ? void 0 : _c._id)) {
        const err = new Error('Not authorized!');
        err.statusCode = 403;
        throw err;
    }
    res.status(200).json({ message: 'Products Delets' });
    const user = yield Authentication_1.default.findById((_d = req.user) === null || _d === void 0 ? void 0 : _d._id);
    user.product.pull(prodId);
    yield user.save();
});
exports.updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const prodId = req.params.prodId;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const scadenza = req.body.scadenza;
    const ratings = req.body.ratings;
    const MaxQuantity = req.body.MaxQuantity;
    const product = yield Products_1.default.findById(prodId);
    if (!product) {
        const err = new Error('There is A Big Error Try Later');
        err.statusCode = 404;
        throw err;
    }
    if (product.creator.toString() !== ((_e = req.user) === null || _e === void 0 ? void 0 : _e._id)) {
        const err = new Error('You Are Not Athorized');
        err.statusCode = 403;
        throw err;
    }
    product.title = title;
    product.description = description;
    product.price = price;
    product.category = category;
    product.scadenza = scadenza;
    product.ratings = ratings;
    product.MaxQuantity = MaxQuantity;
    const results = yield product.save();
    res.status(200).json({ message: 'You have Update Your Products', product: results });
});
//# sourceMappingURL=Products.js.map