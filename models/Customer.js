import { Schema, model, models } from "mongoose";

const customerSchema = new Schema({
  firstname: {
    type: String,
    minLength: 3,
    required: true,
  },
  lastname: {
    type: String,
    minLength: 2,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: String,
  postalCode: String,
  date: Date,
  products: {
    type: Array,
    default: [],
  },
  userID:{
    type:String,
  },
  avatar: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Customer = models?.Customer || model("Customer", customerSchema);

export default Customer;
