import mongoose from "mongoose";

const Schema = mongoose.Schema;
// define schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
/* create a user model:
// -call the mongoose model class 
// which takes name a singular document(whose 
//   plural form will be used to name 
//   the collection to which it belongs), 
//   and the schema that defines the shape 
//   of the document
  
*/

export interface USER extends mongoose.Document{
  username: string;
  password: string;
  timestamp:any
}

const User = mongoose.model<USER>("User", userSchema);
export default User;
