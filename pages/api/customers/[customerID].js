import Customer from "@/models/Customer";
import connectToDB from "@/utils/DBconnection";

export default async function handler(req, res) {
  try {
    await connectToDB();
    console.log("connected");
  } catch (error) {
    res.status(500).json({ status: "500", message: "error in connection." });
    return;
  }

  if (req.method === "GET") {
    try {
      const id = req.query.customerID;
      const customer = await Customer.findOne({ _id: id });
      res.status(200).json({ userData: customer });
      return;
    } catch (error) {
      res.status(500).json({ status: "500", message: "failed" });
      return;
    }
  }
}
