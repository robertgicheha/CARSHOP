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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.addProducts = void 0;
const uuid_1 = require("uuid");
const Helpers_1 = require("../Helpers");
const DatabaseHelper_1 = require("../DatabaseHelper");
const helperDB = new DatabaseHelper_1.DatabaseHelper();
const addProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { model, bodyType, brand, prices, isDeleted, pictureUrl } = req.body;
        const carToAdd = { carId: (0, uuid_1.v4)(), model, bodyType, brand, prices, isDeleted, pictureUrl };
        const { error } = Helpers_1.car.validate(carToAdd);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        const result = yield (yield helperDB.exec('spAddCars', carToAdd)).recordset;
        res.status(200).json({ message: "Product added" });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.addProducts = addProducts;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const availableCars = yield (yield helperDB.exec('SpGetCars')).recordset;
        res.status(200).json(availableCars);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.getProducts = getProducts;
