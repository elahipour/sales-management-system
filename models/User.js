import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  firstname: {
    type: String,
    minLength: 3,
  },
  lastname: {
    type: String,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  isApprovedByAdmin: {
    type: Boolean,
    default: false,
  },
  totalPurchase:{
    type:Number,
    default:0
  },
  numberOfSales:{
    type:Number,
    default:0
  },
  role: { type: String, default: "user" },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});
const User = models?.User || model("User", userSchema);

export default User;
