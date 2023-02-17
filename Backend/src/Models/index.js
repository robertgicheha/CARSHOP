"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductType = exports.UserRegistrationType = void 0;
class UserRegistrationType {
    constructor(userId, userName, email, password, address, fullname, phoneNo, country) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.address = address;
        this.fullname = fullname;
        this.phoneNo = phoneNo;
        this.country = country;
    }
}
exports.UserRegistrationType = UserRegistrationType;
class ProductType {
    constructor(carId, model, bodyType, brand, prices, isDeleted, pictureUrl) {
        this.carId = carId;
        this.model = model;
        this.bodyType = bodyType;
        this.brand = brand;
        this.prices = prices;
        this.isDeleted = isDeleted;
        this.pictureUrl = pictureUrl;
    }
}
exports.ProductType = ProductType;
