"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartSchema = exports.car = exports.loginSchema = exports.registration = void 0;
const joi_1 = __importDefault(require("joi"));
const joi_2 = require("joi");
exports.registration = joi_1.default.object({
    userName: joi_1.default.string().required().messages({
        'string.empty': ' Please add a User Name'
    }),
    email: joi_1.default.string().required().email().messages({
        'string.empty': ' Please add an Email',
        'string.email': 'Not a Valid Email'
    }),
    password: joi_1.default.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$')),
    address: joi_1.default.string(),
    fullname: joi_1.default.string(),
    phoneNo: joi_1.default.string(),
    country: joi_1.default.string(),
    confirmPassword: joi_1.default.equal((0, joi_2.ref)('password'))
});
exports.loginSchema = joi_1.default.object({
    userName: joi_1.default.string().required().messages({
        'string.empty': ' Please add a User Name'
    }),
    password: joi_1.default.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$'))
});
exports.car = joi_1.default.object({
    carId: joi_1.default.string().required(),
    model: joi_1.default.string().required(),
    bodyType: joi_1.default.string().required(),
    brand: joi_1.default.string().required(),
    prices: joi_1.default.number().required(),
    isDeleted: joi_1.default.string(),
    pictureUrl: joi_1.default.string()
});
exports.cartSchema = joi_1.default.object({
    cardID: joi_1.default.string().required(),
    carBrand: joi_1.default.string().required(),
    userId: joi_1.default.string().required(),
    carID: joi_1.default.string().required(),
    prices: joi_1.default.number().required(),
    quantity: joi_1.default.number().required()
});
