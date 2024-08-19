
import { jwtVerify } from "jose";

export const verifyToken = async (token) =>{
    try {
        const decodedToken = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_TOKEN))
        // console.log("VERIFY",decodedToken);
        return decodedToken.payload
    } catch (error) {
        console.log(error);
        throw new Error("Token has expired")
        
    }
}