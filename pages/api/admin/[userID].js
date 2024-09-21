import User from "@/models/User";
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
      const id = req.query.userID;
      const user = await User.findOne({ _id: id });
      res.status(200).json({ userData: user });
      return;
    } catch (error) {
      res.status(500).json({ status: "500", message: "failed" });
      return;
    }
  }
}