import mongoose from "mongoose";
const Schema = mongoose.Schema;
// define schema
const organizationSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

const Organization = mongoose.model("Organization", organizationSchema);
export default Organization;
