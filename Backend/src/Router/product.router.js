"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../Controller/products");
const productRoute = (0, express_1.Router)();
productRoute.post("", products_1.addProducts);
productRoute.get("/getproducts", products_1.getProducts);
exports.default = productRoute;
