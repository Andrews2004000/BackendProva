"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.editProduct = exports.createProducts = exports.getProduct = exports.getAllProducts = void 0;
const Products_1 = __importDefault(require("../model/Products"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const Auth_1 = __importDefault(require("../model/Auth"));
exports.getAllProducts = async (req, res, next) => {
    const reqQuery = { ...req.query };
    delete reqQuery.owned;
    delete reqQuery.search;
    const querySearch = req.query.search;
    let productQuery = Products_1.default.find(reqQuery);
    if (req.token && req.query.owned === 'true') {
        const currentUserId = await Auth_1.default.getIdFromJwt(req.token);
        const currentUser = await Auth_1.default.findById(currentUserId);
        if (!(currentUser === null || currentUser === void 0 ? void 0 : currentUser.isAdmin())) {
            productQuery = productQuery.where('vendor').equals(currentUserId);
        }
    }
    if (querySearch) {
        const searchKeyWord = querySearch.split('+').join(' ');
        productQuery.where('title').regex(new RegExp(searchKeyWord, 'i'));
    }
    const products = await productQuery;
    res.json({
        status: 'success',
        data: products
    });
};
exports.getProduct = async (req, res, next) => {
    const product = await Products_1.default.findById(req.params.prodId).populate('vendor');
    if (!product) {
        throw new AppError_1.default('NO PRODUCTS', 404);
    }
    res.status(200).json({
        status: 'success',
        data: product
    });
};
exports.createProducts = async (req, res, next) => {
    const ProductData = { ...req.body };
    const newProduct = await Products_1.default.create(ProductData);
    if (!newProduct) {
        throw new AppError_1.default('NO PRODUCTS', 404);
    }
    res.status(201).json({
        status: 'success',
        data: newProduct
    });
};
exports.editProduct = async (req, res, next) => {
    const product = await Products_1.default.findById(req.params.prodId);
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
};
exports.deleteProduct = async (req, res, next) => {
    const product = await Products_1.default.findById(req.params.prodId);
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
    await Products_1.default.findByIdAndDelete(product._id);
    res.status(204).json({
        status: 'success',
        data: null
    });
};
//# sourceMappingURL=Products.js.map