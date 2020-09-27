import graphql from "graphql";
import * as joiValidation from "../models/joi";
import { HttpError } from "http-errors";
import bcrypt from "bcrypt";
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from "graphql";
import OrganizationModel from "../models/organizationSchema";
import Organization from "./organizationSchema";
import { joiVal } from "./joi";
import User,{USER} from "./userSchema";

// const {} = graphql;

const OrganizationType = new GraphQLObjectType({
  name: "Organization",
  fields: () => ({
    id: { type: GraphQLID },
    organization: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    products: { type: new GraphQLList(GraphQLString) },
    marketValue: { type: GraphQLInt },
    address: { type: GraphQLString },
    ceo: { type: GraphQLString },
    country: { type: GraphQLString },
    noOfEmployees: { type: GraphQLInt },
    employees: { type: new GraphQLList(GraphQLString) },
  }),
});
// GET SINGLE ORGANIZATION BY ID
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getOneOrganization: {
      type: OrganizationType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return OrganizationModel.findById(args.id);
      },
    },
    // GET ALL ORGANIZATION
    getAllOrganization: {
      type: new GraphQLList(OrganizationType),
      args: {},
      resolve(_, _args, req) {
        req.status = 200;
        console.log(req.status)
        return OrganizationModel.find();
      },
    },
  },
});
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});
// POST MUTATION
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOrganization: {
      type: OrganizationType,
      args: {
        organization: { type: GraphQLString },
        products: { type: new GraphQLList(GraphQLString) },
        marketValue: { type: GraphQLInt },
        address: { type: GraphQLString },
        ceo: { type: GraphQLString },
        country: { type: GraphQLString },
        noOfEmployees: { type: GraphQLInt },
        employees: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(parent, args) {
        try {
          // console.log(args);

          args.noOfEmployees = args.employees.length;
          // validate here
          // const validatedArgs = joiValidation.joiVal(args).value;
          const { error, value } = joiValidation.joiVal(args);
          if (error) {
            return error;
          }
          // const err = joiValidation.joiVal(args).error;
          // console.log(err);

          // console.log(validatedArgs);
          // if (validatedArgs) {
          //   let organization = new OrganizationModel(validatedArgs);
          //   return await organization.save();
          // }

          let organization = new OrganizationModel(value);
          return await organization.save();
        } catch {
          (err: HttpError) => {
            // console.log(err.message);
          };
        }
      },
    }, //END OF POST

    // UPDATE
    updateOrganization: {
      type: OrganizationType,
      args: {
        id: { type: GraphQLID },
        organization: { type: GraphQLString },
        products: { type: new GraphQLList(GraphQLString) },
        marketValue: { type: GraphQLInt },
        address: { type: GraphQLString },
        ceo: { type: GraphQLString },
        country: { type: GraphQLString },
        noOfEmployees: { type: GraphQLInt },
        employees: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(parent, args) {
        try {
          // console.log(args);
          const { id, ...others } = args;
          others.noOfEmployees = others.employees.length;
          // vaidata here
          const result = await Organization.findByIdAndUpdate(id, others, {
            new: true,
          });
          // console.log(result);
          return result;
        } catch {
          (err: HttpError) => {
            console.log(err.message);
          };
        }
      },
    }, //END OF UPDATE

    // delete
    deleteOrganization: {
      type: OrganizationType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        try {
          const { id } = args;
          // vaidata here
          const result = await Organization.findByIdAndRemove(id);
          // console.log(result);
          return result;
        } catch {
          (err: HttpError) => {
            console.log(err.message);
          };
        }
      },
    },
    // CREATE USER
    addUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        try {
          // const { id } = args;
          // vaidata here
          let data;
          const { username, password } = args;
          bcrypt.hash(password, 1).then((password) => {
            data = { username, password };
            const user = new User(data);
            user.save();
          });
          return data;
        } catch {
          (err: HttpError) => {
            console.log(err.message);
          };
        }
      },
    },
    // LOGIN
    userLogin: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        try {
          const userloggin = await User.findOne({ username: args.username }) as USER;
          // return userloggin
          // console.log(userloggin);
          
          bcrypt.compare(args.password,
            userloggin?.password
          ).then((valid) => {
            // console.log("eyeyeee");
            
            if (valid) {
              console.log("yyyyyeyeyeee");
              console.log(userloggin);
              return userloggin;
               
            }
          });
        } catch {
          (err: HttpError) => {
            console.log(err.message);
          };
        }
      },
    },

    // END OF LOGIN
  },
});

export default new GraphQLSchema({
  query: RootQuery,        
  mutation: Mutation,
});
