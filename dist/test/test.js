"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var mongoose_1 = __importDefault(require("mongoose"));
var app_1 = __importDefault(require("../app"));
var request = supertest_1.default(app_1.default);
describe("/", function () {
    it("can get correctly", function (done) {
        return request
            .post("/graphql")
            .send({
            query: "\n      query{\n        getOneOrganization(id:\"5f60cdc576fd80bb110af5a3\"){\n          organization,\n          employees,\n          noOfEmployees,\n        }\n      }  \n      ",
        })
            .then(function (res) {
            console.log(res.text);
            expect(res.status).toBe(200);
            done();
        });
    });
});
describe("/", function () {
    it("can get correctly", function (done) {
        return request
            .post("/graphql")
            .send({
            query: "\n      query{\n        getAllOrganization{\n          employees\n        }\n      }  \n      ",
        })
            .then(function (res) {
            console.log(res.text);
            expect(res.status).toBe(200);
            done();
        });
    });
});
describe("/", function () {
    it("can get correctly", function (done) {
        return request
            .post("/graphql")
            .send({
            query: "\n      mutation{\n        addOrganization(\n        organization: \"GOOOddddd\"\n         products: [\"garri\"]\n         marketValue: 8\n         address: \"Asnjo\"\n        ceo: \"Oyinkan\"\n        country: \"India\"\n        employees: [\"Stalion\"]\n        ){\n          country\n        }\n      }  \n      ",
        })
            .then(function (res) {
            console.log(res.text);
            expect(res.status).toBe(200);
            done();
        });
    });
});
describe("/", function () {
    it("can get correctly", function (done) {
        return request
            .post("/graphql")
            .send({
            query: "\n      mutation{\n        updateOrganization(\n          id:\"5f60cdc576fd80bb110af5a3\",\n          country:\"Plateau\",\n          ){\n          country\n        }\n      }  \n      ",
        })
            .then(function (res) {
            console.log(res.text);
            expect(res.status).toBe(200);
            done();
        });
    });
});
describe("/", function () {
    it("can get correctly", function (done) {
        return request
            .post("/graphql")
            .send({
            query: "\n      mutation{\n        deleteOrganization(id:\"5f60cdc576fd80bb110af5a3\"){\n          country\n        }\n      }  \n      ",
        })
            .then(function (res) {
            console.log(res.text);
            expect(res.status).toBe(200);
            done();
        });
    });
});
afterAll(function (done) {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose_1.default.connection.close();
    done();
});
