import Customer from "@/models/Customer";
import connectToDB from "@/utils/DBconnection";

export default async function handler(req, res) {
  try {
    await connectToDB();
  } catch (error) {
    res.status(500).json({ message: "error in connection." });
    return;
  }
  if (req.method === "PATCH") {
    try {
      const id = req.query.customerID;
      const newCustomer = req.body.data;
      console.log({id,newCustomer})
      const currentCustomer = await Customer.findOne({ _id: id });
      currentCustomer.firstname = newCustomer.firstname;
      currentCustomer.lastname = newCustomer.lastname;
      currentCustomer.email = newCustomer.email;
      currentCustomer.phone = newCustomer.phone;
      currentCustomer.address = newCustomer.address;
      currentCustomer.date = newCustomer.date;
      currentCustomer.postalCode = newCustomer.postalCode;
      currentCustomer.products = newCustomer.products;
      currentCustomer.updatedAt = Date.now();
      currentCustomer.save();
      res.status(201).json({ status: "201", message: "customer was updated." });
    } catch (error) {
      res.status(500).json({ status: "500", message: "failed." });
    }
  }
}
