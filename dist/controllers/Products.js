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
exports.deleteProduct = exports.editProduct = exports.createProducts = exports.getProduct = exports.getAllProducts = void 0;
const Products_1 = __importDefault(require("../model/Products"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const Auth_1 = __importDefault(require("../model/Auth"));
exports.getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqQuery = Object.assign({}, req.query);
    delete reqQuery.owned;
    delete reqQuery.search;
    let productQuery = Products_1.default.find(reqQuery);
    if (req.token && req.query.owned === 'true') {
        const currentUserId = yield Auth_1.default.getIdFromJwt(req.token);
        const currentUser = yield Auth_1.default.findById(currentUserId);
        if (!(currentUser === null || currentUser === void 0 ? void 0 : currentUser.isAdmin())) {
            productQuery = productQuery.where('vendor').equals(currentUserId);
        }
    }
    if (req.query.search) {
        const searchKeyWord = req.query.search.split('+').join(' ');
        productQuery.where('title').regex(new RegExp(searchKeyWord, 'i'));
    }
    const products = yield productQuery;
    res.json({
        status: 'success',
        data: products
    });
});
exports.getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Products_1.default.findById(req.params.prodId);
    if (!product) {
        throw new AppError_1.default('NO PRODUCTS', 404);
    }
    res.status(200).json({
        status: 'success',
        data: product
    });
});
exports.createProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, role, imageUrl, price, tags, category, ratings, scadenza, maxQuantity, vendor } = req.body;
    const newProduct = yield Products_1.default.create(req.body);
    if (!newProduct) {
        throw new AppError_1.default('NO PRODUCTS', 404);
    }
    res.status(201).json({
        status: 'success',
        data: newProduct
    });
});
exports.editProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Products_1.default.findById(req.params.prodId);
    if (!product) {
        throw new AppError_1.default('NO PRODUCTS', 404);
    }
    const user = req.user;
    if (!user) {
        throw new AppError_1.default('NO PRODUCTS', 404);
    }
    if (user.role !== 'admin') {
        if (user.vendor._id.toString() !== user._id.toString()) {
            throw new AppError_1.default('NO PRODUCTS', 404);
        }
    }
    Object.keys(req.body).forEach((k) => {
        if (k in product) {
            product[k] = req.body[k];
        }
    });
    product.save();
    res.status(201).json({
        status: 'success',
        data: product
    });
});
exports.deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Products_1.default.findById(req.params.prodId);
    if (!product) {
        throw new AppError_1.default('NO PRODUCTS', 404);
    }
    const user = req.user;
    if (!user) {
        throw new AppError_1.default('NO USER', 404);
    }
    if (user.role !== 'admin') {
        if (product.vendor._id.toString() !== user._id.toString()) {
            throw new AppError_1.default('NO PRODUCTS', 404);
        }
    }
    yield Products_1.default.findByIdAndDelete(product._id);
    res.status(204).json({
        status: 'success',
        data: null
    });
});
//# sourceMappingURL=Products.js.map