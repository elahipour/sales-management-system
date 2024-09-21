import Customer from "@/models/Customer";
import User from "@/models/User";
import connectToDB from "@/utils/DBconnection";
import { verification } from "@/utils/auth";

export default async function handler(req,res){
try {
    connectToDB();
} catch (error) {
    res.status(500).json({status:'500',message:'connection error.'})
}
if(req.method!=="POST")return;

const {token}=req.cookies;

if(!token){
    res.status(401).json({status:'401',message:'unauthorized error.'});
    return;
}

const secretKey=process.env.SECRET_KEY;
const user=verification(token,secretKey);

if(!user){
    res.status(401).json({status:'401',message:'unauthorized error'});
    return;
}

const users=await User.find({role:'user'});
const customers=await Customer.find();
const sellersAndNumberOfCustomers=[];
users.map(user=>{
const userCustomer=customers.filter(customer=>{
 return user._id.toString()===customer.userID
});
user.numberOfSales=+userCustomer.length;
user.save();
sellersAndNumberOfCustomers.push(user)
})
sellersAndNumberOfCustomers.sort((a,b)=>b.numberOfSales-a.numberOfSales);

res.status(200).json({status:'200',sellers:{allSellers:sellersAndNumberOfCustomers,top3Sellers:sellersAndNumberOfCustomers.slice(0,3)}});
return;



}