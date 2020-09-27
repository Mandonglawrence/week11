"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiVal = void 0;
var joi_1 = __importDefault(require("joi"));
function joiVal(data) {
    var joiOrganizationSchema = joi_1.default.object({
        organization: joi_1.default.string().min(5).required(),
        ceo: joi_1.default.string().required(),
        products: joi_1.default.array().items(joi_1.default.string()).required(),
        marketValue: joi_1.default.number().required(),
        address: joi_1.default.string().required(),
        country: joi_1.default.string().required(),
        noOfEmployees: joi_1.default.number().required(),
        employees: joi_1.default.array().items(joi_1.default.string()).required(),
    });
    return joiOrganizationSchema.validate(data, { abortEarly: false });
}
exports.joiVal = joiVal;
