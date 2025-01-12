import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({
    path:"../config/.env"
})
// Storing the user ID in req.user eliminates the need to decode the token repeatedly, providing easy access to the authenticated user's details.
// means after we get req.user we don't need to compare again and again  we only show this id and it will pass us
const isAuthenticated = async (req, res, next) =>{
    try {
        const token = req.cookies.token;
        // console.log(token);
        if(!token){
            return res.status(401).json({
                message: "User not authenticated",
                success:false,
            })
        }
        const decode = await jwt.verify(token , process.env.TOKEN_SECRET )
        req.user = decode.userId;
        next();
    } catch (error) {
        
    }
}
export default isAuthenticated;