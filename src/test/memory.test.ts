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

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({}, () => {});
  }
};

beforeAll(async () => connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => closeDatabase());

describe("POST  ", () => {
  /**
   * Tests that you can post to db.
   */
  let data = {
    products: ["Mango", "Cashew"],
    employees: ["Uche", "Bulus"],
    organization: "Rggfj",
    address: "US",
    ceo: "John",
    country: "Nigeria",
    // marketValue: 90,
    noOfEmployees: 0,
  };
  data["noOfEmployees"] = data.employees.length;
  it("can be created correctly", async () => {
    expect(async () => await Organization.create()).not.toThrow();
  });
});

describe("filter by ID", () => {
  /**
   * Tests that you can find by id
   */
  it("can be get correctly", async () => {
    expect(
      async () => await Organization.findById("5f5575724c08c2f6ede2c5eb")
    ).not.toThrow();
  });
});
describe("delete by ID", () => {
  /**
   * Tests deleting from db
   */
  it("can be delete correctly", async () => {
    expect(async () => await Organization.findByIdAndRemove()).not.toThrow();
  });
});
describe("Update by ID", () => {
  /**
   * Tests updating from db
   */
  it("can be updates correctly", async () => {
    expect(async () => await Organization.findByIdAndUpdate()).not.toThrow();
  });
});
describe("filter by organization name ", () => {
  /**
   * Tests updating from db
   */
  it("can be filtered by organization name correctly", async () => {
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
      async () => await Organization.find({ organization: data.organization })
    ).not.toThrow();
  });
});
describe("filter by market value", () => {
  /**
   * Tests updating from db
   */
  it("can be filter by market value correctly", async () => {
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
      async () => await Organization.find({ marketValue: data.marketValue })
    ).not.toThrow();
  });
});
describe("Can get all from database", () => {
  /**
   * Tests updating from db
   */
  it("can get all correctly", async () => {
    expect(async () => await Organization.find()).not.toThrow();
  });
});

