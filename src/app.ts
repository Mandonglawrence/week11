import express from "express";
import { graphqlHTTP } from "express-graphql";
import morgan from "morgan";
import grapqlModel from "./models/graphqlModel";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
async function connectToCluster(){
  await mongoose.connect(/*`mongodb+srv://lawrence:lawman4u@cluster0.flvwz.mongodb.net/week9`*/
  "mongodb://localhost/week9",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("mongodb connected successfully")
    }
    mongoose.connection.close();
  }
  )

}
connectToCluster();
const app = express();
app.use(morgan("dev"));
app.use("/graphql",
  graphqlHTTP(
  {
  schema: grapqlModel,
  graphiql: true
    }
  ));
// app.listen(5001, () => console.log("app running on port 5005"));
export default app;
