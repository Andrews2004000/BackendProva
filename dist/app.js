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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_bearer_token_1 = __importDefault(require("express-bearer-token"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db = __importStar(require("./MongooseConnection/database"));
const Auth_1 = __importDefault(require("./routes/Auth"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const Products_1 = __importDefault(require("./routes/Products"));
const csurf_1 = __importDefault(require("csurf"));
const compression_1 = __importDefault(require("compression"));
const csrfConnection = csurf_1.default({ cookie: true });
const app = express_1.default();
app.use(cors_1.default({ credentials: true, origin: 'localhost:8080' }));
app.use(express_bearer_token_1.default({
    cookie: {
        signed: true,
        secret: 'secret' || '',
        key: 'access_token',
    },
}));
app.use(cookie_parser_1.default('secret'));
app.use(compression_1.default());
app.use(xss_clean_1.default());
db.mongooseconnect();
app.use(csrfConnection);
//BodyParser
app.use(body_parser_1.default.json());
app.use('/api/v1/user', Auth_1.default);
app.use('/api/v2/products', Products_1.default);
//Error Handling
app.use((err, req, res, _) => {
    res.status(err.statusCode || 500).json({
        status: 'failed',
        message: err.message
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map