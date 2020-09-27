"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
// define schema
var organizationSchema = new Schema({
    organization: {
        type: String,
        required: true,
        unique: true,
    },
    products: {
        type: [String],
        required: true,
    },
    marketValue: { type: Number, required: true },
    noOfEmployees: {
        type: Number,
        required: true,
    },
    ceo: {
        type: String,
        required: true,
    },
    employees: {
        type: [String],
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    country: { type: String, required: true },
}, { timestamps: true });
var Organization = mongoose_1.default.model("Organization", organizationSchema);
exports.default = Organization;
