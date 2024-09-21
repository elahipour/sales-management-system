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
    res.status(500).json({status:'401',message:'unauthorized error.'});
    return;
}

const secretKey=process.env.SECRET_KEY;
const user=verification(token,secretKey);

if(!user){
    res.status(500).json({status:'401',message:'unauthorized error'});
    return;
}

const users=await User.find({role:'user'});
const customers=await Customer.find();
const sellersAndPurchaseAmount=[];
users.map(user=>{
let sum=0;
const userCustomer=customers.map(customer=>{
if(user._id.toString()===customer.userID){
let customersPurchaseAmount= customer.products.reduce((acc,cur)=> acc+(+cur.qty*+cur.price),0); 
sum+=customersPurchaseAmount;
}
})
user.totalPurchase=+sum;
user.save();
sellersAndPurchaseAmount.push(user)
})
sellersAndPurchaseAmount.sort((a,b)=>b.totalPurchase-a.totalPurchase);
res.status(200).json({status:'200',sellers:{allSellers:sellersAndPurchaseAmount,top3Sellers:sellersAndPurchaseAmount.slice(0,3)}});
return;

}