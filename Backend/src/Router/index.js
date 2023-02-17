"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRegistration_1 = require("../Controller/userRegistration");
const router = (0, express_1.Router)();
router.get('', userRegistration_1.getUsers);
router.post('', userRegistration_1.addUsers);
router.get('/:id', userRegistration_1.getSpecUser);
exports.default = router;
