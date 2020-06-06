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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppFeaures_1 = require("../middlewere/AppFeaures");
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const UserController = __importStar(require("../controllers/Authentication"));
const router = express_promise_router_1.default();
//Routes For Normal Things
router.route('/')
    .post(UserController.login)
    .put(UserController.signUp)
    .get(AppFeaures_1.protect, UserController.getAllUsers);
/// Routes For Updatings
router.route('/userUpdatings')
    .patch(AppFeaures_1.protect, AppFeaures_1.restrictRole('admin' || 'vendor' || 'client'), UserController.upadteUser)
    .post(AppFeaures_1.protect, AppFeaures_1.restrictRole('admin' || 'vendor' || 'client'), UserController.Logout)
    .delete(AppFeaures_1.protect, AppFeaures_1.restrictRole('admin' || 'vendor' || 'client'), UserController.deletAccount);
exports.default = router;
//# sourceMappingURL=Auth.js.map