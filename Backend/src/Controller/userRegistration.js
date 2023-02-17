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
exports.addUsers = exports.getSpecUser = exports.getUsers = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const config_1 = require("../config");
const DatabaseHelper_1 = require("../DatabaseHelper");
const Helpers_1 = require("../Helpers");
const helperDB = new DatabaseHelper_1.DatabaseHelper();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const registration = yield (yield (pool.request().execute("SpGetUsers"))).recordset;
        res.status(200).json(registration);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.getUsers = getUsers;
const getSpecUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const registration = yield (yield (pool.request().execute("SpGetSpecificUser", { userName }))).recordset[0];
        res.status(200).json(registration);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.getSpecUser = getSpecUser;
const addUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password, address, fullname, phoneNo, country } = req.body;
        const { error } = Helpers_1.registration.validate({ userName, email, password });
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        const IdUser = (0, uuid_1.v4)();
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        yield pool.request()
            .input('IdUser', IdUser)
            .input('Name', userName)
            .input('Email', email)
            .input('Password', password)
            .input('Address', address)
            .input('FullName', fullname)
            .input('PhoneNo', phoneNo)
            .input('country', country)
            .execute('spRegisterUser');
        res.status(200).json({ message: 'User Registered' });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.addUsers = addUsers;
