import { verify } from "jsonwebtoken";

const { hash, compare } = require("bcryptjs");

async function hashPassword(password){
    const hashedPassword=await hash(password,12);
    return hashedPassword;
}

async function verifyPassword(password,hashedPassword){
    const isValid=await compare(password,hashedPassword);
    return isValid;

}

function verification(token,secretKey){
    try {
        const isVerify=verify(token,secretKey);
        return isVerify;
    } catch (error) {
        return false;
    }
}
export {hashPassword,verifyPassword,verification}