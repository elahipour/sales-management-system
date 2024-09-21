import User from "@/models/User";
import connectToDB from "@/utils/DBconnection";
import { hashPassword } from "@/utils/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    await connectToDB();
  } catch (error) {
    res.status(500).json({ status: "500", message: "connection error" });
    return;

  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ status: "400", message: "validation error" });
    return;
  }

  const user = await User.findOne({ email: email });
  if (user) {
    res
      .status(400)
      .json({ status: "400", message: "This user has already registered" });
    return;
    

  }
  const hashedPassword=await hashPassword(password);
try {
    await User.create({email:email,password:hashedPassword});
    res.status(201).json({status:'201',message:'the user was registered'});
    return;
} catch (error) {
    res.status(500).json({ status: "500", message: "server error" });
}
}
