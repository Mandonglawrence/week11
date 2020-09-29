import Organization from '../models/organizationSchema';
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const mongod = new MongoMemoryServer();
// dotenv.config();
const connect = async () => {
  const uri = "mongodb://localhost/myTests";
  // const uri =process.env.DATABASE_URI;

  const mongooseOpts = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

const closeDatabase = () => {
  try {
    
    mongoose.connection.dropDatabase();
    mongoose.connection.close();
    mongod.stop();
  } catch (error) {
    
  }
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({}, () => {});
  }
};

beforeAll( async() => await connect());

/**
 * Clear all test data after every test.
 */afterEach( () => clearDatabase());
      
      /**
       * Remove and close the db and server.
       */
      afterAll(() => closeDatabase());

describe("POST  ", () => {
  /**
   * Tests that you can post to db.
   */
    it("can be created correctly",  async() => {
     await expect(async() => await Organization.create()).not.toThrow();
  });
});

describe("filter by ID", () => {
  /**
   * Tests that you can find by id
   */
  it("can be get correctly",  async() => {
     await expect(
      async() => await Organization.findById("5f5575724c08c2f6ede2c5eb")
      ).not.toThrow();
    });
  });
  describe("delete by ID", () => {
    /**
     * Tests deleting from db
     */
    it("can be delete correctly", async() => {
       await expect( async() =>await Organization.findByIdAndRemove()).not.toThrow();
    });
  });
  describe("Update by ID", () => {
    /**
     * Tests updating from db
     */
    it("can be updates correctly", async() => {
       expect(async() => await Organization.findByIdAndUpdate()).not.toThrow();
    });
  });
  describe("filter by organization name ", () => {
    /**
     * Tests updating from db
     */
    it("can be filtered by organization name correctly", async() => {
      
        expect(
        async() => await Organization.find({ organization:"organization" })
        ).not.toThrow();
      });
    });
    describe("filter by market value", () => {
      /**
       * Tests updating from db
       */
      it("can be filter by market value correctly", async() => {
        let data = {
          products: ["Mango", "Cashew"],
          employees: ["Uche", "Bulus", "Joseph"],
          noOfEmployees: 2,
          organization: "Rggfj",
          address: "US",
          country: "Nigeria",
          marketValue: 90,
        };
          expect(
          async() =>  await Organization.find({ marketValue: data.marketValue })
          ).not.toThrow();
        });
      });
      describe("Can get all from database", () => {
        /**
         * Tests updating from db
         */
        it("can get all correctly", (done) => {
          expect(async () => await Organization.find()).not.toThrow();
          done()
        });
      });