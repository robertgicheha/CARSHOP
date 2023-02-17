"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const Router_1 = __importDefault(require("./Router"));
const authRoute_1 = __importDefault(require("./Router/authRoute"));
const product_router_1 = __importDefault(require("./Router/product.router"));
const cartRouter_1 = __importDefault(require("./Router/cartRouter"));
const app = (0, express_1.default)();
//registering some middlewares
app.use((0, express_1.json)()); //adds a body to the request
app.use('/users', Router_1.default);
app.use('/auth', authRoute_1.default);
app.use("/products", product_router_1.default);
app.use('/cart', cartRouter_1.default);
const port = process.env.PORT || 4000;
app.get('/home', (req, res) => {
    res.send("testing postman");
});
app.listen(port, () => {
    console.log("server running");
});
