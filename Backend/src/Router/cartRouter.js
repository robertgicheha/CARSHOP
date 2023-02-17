"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController_1 = require("../Controller/cartController");
const verifyToken_1 = require("../Middlewares/verifyToken");
const cartRoute = (0, express_1.Router)();
cartRoute.post("", verifyToken_1.verifyToken, cartController_1.addProductsToCart);
exports.default = cartRoute;
