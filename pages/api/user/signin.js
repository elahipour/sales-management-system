import User from "@/models/User";
import connectToDB from "@/utils/DBconnection";
import { verifyPassword } from "@/utils/auth";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

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
  if (!user) {
    res.status(400).json({ status: "400", message: "user not found!" });
    return;
  }
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    res
      .status(500)
      .json({ status: "500", message: "email or password is incorrect" });
    return;
  }

  if (!user.isApprovedByAdmin) {
    res
      .status(202)
      .json({
        status: "202",
        message: "Your account must be approved by an administrator",
      });
    return;
  }
  const secretKey = process.env.SECRET_KEY;
  const expiration = 24 * 60 * 60;
  const token = sign({ email,role:user.role }, secretKey, { expiresIn: expiration });
  const serialized = serialize("token", token, {
    httpOnly: true,
    maxAge: expiration,
    path: "/",
  });
    res
      .status(200)
      .setHeader("Set-Cookie", serialized)
      .json({ status: "200", message: "you logged in ",role:user.role });
}
