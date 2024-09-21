import mongoose from "mongoose";

async function connectToDB(){
    if(mongoose.connections[0].readyState)return;
   await mongoose.connect(process.env.DB_URI);
    console.log('connected.')
}


export default connectToDB;