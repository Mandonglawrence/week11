"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var joiValidation = __importStar(require("../models/joi"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var graphql_1 = require("graphql");
var organizationSchema_1 = __importDefault(require("../models/organizationSchema"));
var organizationSchema_2 = __importDefault(require("./organizationSchema"));
var userSchema_1 = __importDefault(require("./userSchema"));
// const {} = graphql;
var OrganizationType = new graphql_1.GraphQLObjectType({
    name: "Organization",
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        organization: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString },
        products: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        marketValue: { type: graphql_1.GraphQLInt },
        address: { type: graphql_1.GraphQLString },
        ceo: { type: graphql_1.GraphQLString },
        country: { type: graphql_1.GraphQLString },
        noOfEmployees: { type: graphql_1.GraphQLInt },
        employees: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
    }); },
});
// GET SINGLE ORGANIZATION BY ID
var RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getOneOrganization: {
            type: OrganizationType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve: function (_, args) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, organizationSchema_1.default.findById(args.id)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            },
        },
        // GET ALL ORGANIZATION
        getAllOrganization: {
            type: new graphql_1.GraphQLList(OrganizationType),
            args: {},
            resolve: function (_, _args, req) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                req.status = 200;
                                console.log(req.status);
                                return [4 /*yield*/, organizationSchema_1.default.find()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            },
        },
    },
});
var UserType = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        username: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
    }); },
});
// POST MUTATION
var Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addOrganization: {
            type: OrganizationType,
            args: {
                organization: { type: graphql_1.GraphQLString },
                products: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
                marketValue: { type: graphql_1.GraphQLInt },
                address: { type: graphql_1.GraphQLString },
                ceo: { type: graphql_1.GraphQLString },
                country: { type: graphql_1.GraphQLString },
                noOfEmployees: { type: graphql_1.GraphQLInt },
                employees: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
            },
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, error, value, organization, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _c.trys.push([0, 2, , 3]);
                                // console.log(args);
                                args.noOfEmployees = args.employees.length;
                                _a = joiValidation.joiVal(args), error = _a.error, value = _a.value;
                                if (error) {
                                    return [2 /*return*/, error];
                                }
                                organization = new organizationSchema_1.default(value);
                                return [4 /*yield*/, organization.save()];
                            case 1: return [2 /*return*/, _c.sent()];
                            case 2:
                                _b = _c.sent();
                                (function (err) {
                                    // console.log(err.message);
                                });
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        },
        // UPDATE
        updateOrganization: {
            type: OrganizationType,
            args: {
                id: { type: graphql_1.GraphQLID },
                organization: { type: graphql_1.GraphQLString },
                products: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
                marketValue: { type: graphql_1.GraphQLInt },
                address: { type: graphql_1.GraphQLString },
                ceo: { type: graphql_1.GraphQLString },
                country: { type: graphql_1.GraphQLString },
                noOfEmployees: { type: graphql_1.GraphQLInt },
                employees: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
            },
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var id, others, result, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                id = args.id, others = __rest(args, ["id"]);
                                others.noOfEmployees = others.employees.length;
                                return [4 /*yield*/, organizationSchema_2.default.findByIdAndUpdate(id, others, {
                                        new: true,
                                    })];
                            case 1:
                                result = _b.sent();
                                // console.log(result);
                                return [2 /*return*/, result];
                            case 2:
                                _a = _b.sent();
                                (function (err) {
                                    console.log(err.message);
                                });
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        },
        // delete
        deleteOrganization: {
            type: OrganizationType,
            args: {
                id: { type: graphql_1.GraphQLID },
            },
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var id, result, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                id = args.id;
                                return [4 /*yield*/, organizationSchema_2.default.findByIdAndRemove(id)];
                            case 1:
                                result = _b.sent();
                                // console.log(result);
                                return [2 /*return*/, result];
                            case 2:
                                _a = _b.sent();
                                (function (err) {
                                    console.log(err.message);
                                });
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        },
        // CREATE USER
        addUser: {
            type: UserType,
            args: {
                id: { type: graphql_1.GraphQLID },
                username: { type: graphql_1.GraphQLString },
                createdAt: { type: graphql_1.GraphQLString },
                updatedAt: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
            },
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var data_1, username_1, password;
                    return __generator(this, function (_a) {
                        try {
                            username_1 = args.username, password = args.password;
                            bcrypt_1.default.hash(password, 1).then(function (password) {
                                data_1 = { username: username_1, password: password };
                                var user = new userSchema_1.default(data_1);
                                user.save();
                            });
                            return [2 /*return*/, data_1];
                        }
                        catch (_b) {
                            (function (err) {
                                console.log(err.message);
                            });
                        }
                        return [2 /*return*/];
                    });
                });
            },
        },
        // LOGIN
        userLogin: {
            type: UserType,
            args: {
                username: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
            },
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var userloggin_1, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, userSchema_1.default.findOne({ username: args.username })];
                            case 1:
                                userloggin_1 = _b.sent();
                                // return userloggin
                                // console.log(userloggin);
                                bcrypt_1.default.compare(args.password, userloggin_1 === null || userloggin_1 === void 0 ? void 0 : userloggin_1.password).then(function (valid) {
                                    // console.log("eyeyeee");
                                    if (valid) {
                                        console.log("yyyyyeyeyeee");
                                        console.log(userloggin_1);
                                        return userloggin_1;
                                    }
                                });
                                return [3 /*break*/, 3];
                            case 2:
                                _a = _b.sent();
                                (function (err) {
                                    console.log(err.message);
                                });
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
