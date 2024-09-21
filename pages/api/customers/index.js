import Customer from "@/models/Customer";
import User from "@/models/User";
import connectToDB from "@/utils/DBconnection";
import { verification } from "@/utils/auth";
import { data } from "autoprefixer";
export default async function handler(req, res) {
  try {
    await connectToDB();
  } catch (error) {
    res.status(500).json({ status: "200", message: "not connect.😣" });
    return;
  }

  if (req.method === "POST") {
    const { data } = req.body;
    if (!data.firstname || !data.lastname || !data.email) {
      res.status(400).json({ status: "400", message: "fill required fields" });
      return;
    }
    try {
      const { token } = req.cookies;
      const sercretKey = process.env.SECRET_KEY;
      const currentUser = verification(token, sercretKey);
      if (!currentUser) {
        req.status(401).json({ status: "401", message: "unauthorized error" });
        return;
      }
      const user = await User.findOne({ email: currentUser.email });

      const addedUserIdToData = { ...data, userID: user._id };
      const customers = await Customer.create(addedUserIdToData);
      res.status(201).json({ message: "success", customers });
    } catch (error) {
      res.status(500).json({
        status: "500",
        message: "failed in data storing.",
      });
    }
  } else if (req.method === "GET") {
    try {
      const { token } = req.cookies;
      const sercretKey = process.env.SECRET_KEY;
      const currentUser = verification(token, sercretKey);
      const user = await User.findOne({ email: currentUser.email });
      const userCustomers = await Customer.find({ userID: user._id });
      const allCustomers = await Customer.find();
      res.status(200).json({ message: "success", data: {userCustomers,allCustomers} });
    } catch (error) {
      res
        .status(500)
        .json({ status: "500", message: "failed in data fetching." });
      return;
    }
  }
}
