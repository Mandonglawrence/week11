import supertest from "supertest";
import mongoose from "mongoose";

import app from "../app";
import { Response } from "express";

const request = supertest(app);

describe("/", () => {
  it("can get one correctly", async(done) => {
   return await request
      .post("/graphql")
      .send({
        query: `
      query{
        getOneOrganization(id:"5f60cdc576fd80bb110af5a3"){
          organization,
          employees,
          noOfEmployees,
        }
      }  
      `,
      })
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
describe("/", () => {
  it("can get all correctly", async(done) => {
   return await request
      .post("/graphql")
      .send({
        query: `
      query{
        getAllOrganization{
          employees
        }
      }  
      `,
      })
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
describe("/", () => {
  it("can add one correctly", async(done) => {
  return  await request
      .post("/graphql")
      .send({
        query: `
      mutation{
        addOrganization(
        organization: "GOOOddddd"
         products: ["garri"]
         marketValue: 8
         address: "Asnjo"
        ceo: "Oyinkan"
        country: "India"
        employees: ["Stalion"]
        ){
          country
        }
      }  
      `,
      })
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
describe("/", () => {
  it("can update correctly", async(done) => {
   return await request
      .post("/graphql")
      .send({
        query: `
      mutation{
        updateOrganization(
          id:"5f60cdc576fd80bb110af5a3",
          country:"Plateau",
          ){
          country
        }
      }  
      `,
      })
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
describe("/", () => {
  it("can delete correctly", async(done) => {
   return await request
      .post("/graphql")
      .send({
        query: `
      mutation{
        deleteOrganization(id:"5f60cdc576fd80bb110af5a3"){
          country
        }
      }  
      `,
      })
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
  });
