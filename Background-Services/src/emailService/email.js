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
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const helpers_1 = __importDefault(require("../helpers"));
const mssql_1 = __importDefault(require("mssql"));
const config_1 = require("../config");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const sendWelcomeEmail = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(config_1.sqlConfig);
    const users = yield (yield pool.request().execute('SpSendWelcomeEmails')).recordset;
    // console.log(users);
    for (let user of users) {
        ejs_1.default.renderFile('templates/registration.ejs', { userName: user.userName }, (error, html) => __awaiter(void 0, void 0, void 0, function* () {
            //message configuration
            const message = {
                from: process.env.EMAIL,
                to: user.email,
                subject: "NodeMailer",
                html
            };
            //  console.log(html);
            //sending email
            try {
                yield (0, helpers_1.default)(message);
                yield pool.request()
                    .input('IdUser', user.userId)
                    .execute(`SpUpdateUserSentEmail`);
            }
            catch (error) {
                console.log(error.message);
            }
        }));
    }
});
exports.default = sendWelcomeEmail;
//creating a transporter
// const transporter = nodemailer.createTransport({
//     host:'smtp.gmail.com',
//     service:'gmail',
//     port:587,
//     auth:{
//         user:process.env.EMAIL,
//         pass:process.env.PASSWORD
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
//   });
