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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registerUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const config_1 = require("../config");
const Helpers_1 = require("../Helpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const IdUser = (0, uuid_1.v4)();
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const { userName, email, password, address, fullname, phoneNo, country } = req.body;
        //encypting a password
        const encryptPassword = yield bcrypt_1.default.hash(password, 10);
        console.log(encryptPassword);
        const { error } = Helpers_1.registration.validate({ userName, email, password });
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        yield pool.request()
            .input('IdUser', IdUser)
            .input('Name', userName)
            .input('Email', email)
            .input('Password', encryptPassword)
            .input('Address', address)
            .input('Fullname', fullname)
            .input('PhoneNo', phoneNo)
            .input('country', country)
            .execute('spRegisterUser');
        res.status(200).json({ message: 'User Registered' });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        const { error } = Helpers_1.loginSchema.validate({ userName, password });
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        //check if the username exists   
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const user = yield (yield (pool.request().input('Name', userName).execute("SpGetSpecificUser"))).recordset;
        if (!user[0]) {
            return res.status(404).json('user not found');
        }
        //password check
        const validPassword = yield bcrypt_1.default.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(404).json('user where');
        }
        //Authorization and Authentication
        const payload = user.map(property => {
            //omit the password
            const { password } = property, rest = __rest(property, ["password"]);
            return rest;
        });
        const token = jsonwebtoken_1.default.sign(payload[0], process.env.SECRETKEY, { expiresIn: '30000' });
        return res.status(200).json({ message: 'user logged in', token });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.login = login;
