import supertest from "supertest";
import mongoose from "mongoose";

import app from "../app";
import { Response } from "express";

const request = supertest(app);

describe("/", () => {
   it("can get correctly", async(done) => {
   await request
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
        console.log(res.text);
        expect(res.status).toBe(200);
        done();
      });
  });
});
describe("/", () => {
  it("can get correctly", async(done) => {
   await request
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
        console.log(res.text);
        expect(res.status).toBe(200);
        done();
      }).catch(eer=>{console.log(eer);
      });
  });
});
describe("/", () => {
  it("can get correctly", async(done) => {
  await request
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
        console.log(res.text);
        expect(res.status).toBe(200);
        done();
      }).catch(err=>{console.log(err);
      });
  });
});
describe("/", () => {
  it("can get correctly", async(done) => {
   await request
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
        console.log(res.text);
        expect(res.status).toBe(200);
        done();
      }).catch(er=>{
        console.log(er);
        
      });
  });
});
describe("/", () => {
  it("can delete correctly", async(done) => {
   await request
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
        console.log(res.text);
        expect(res.status).toBe(200);
        done();
      }).catch(er => {
        console.log(er);
        
      });
  });
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
  });
