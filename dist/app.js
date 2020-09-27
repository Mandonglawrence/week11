"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var morgan_1 = __importDefault(require("morgan"));
var graphqlModel_1 = __importDefault(require("./models/graphqlModel"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(/*`mongodb+srv://lawrence:lawman4u@cluster0.flvwz.mongodb.net/week9`*/ "mongodb://localhost/week9", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
}, function (err) {
    if (!err) {
        console.log("mongodb connected successfully");
    }
});
var app = express_1.default();
app.use(morgan_1.default("dev"));
app.use("/graphql", express_graphql_1.graphqlHTTP({
    schema: graphqlModel_1.default,
    graphiql: true
}));
// app.listen(5001, () => console.log("app running on port 5005"));
// mongoose.connection.close();
exports.default = app;
