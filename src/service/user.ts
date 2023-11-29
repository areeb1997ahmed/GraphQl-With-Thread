import {prismaClient} from '../libs/db'
import {createHmac,randomBytes} from 'node:crypto'
var JWT = require('jsonwebtoken');

export interface createUserPayload{
    firstName:string
    lastname:string
    email:string
    password:string
}

export interface getUserPayload{
    email:string
    password:string
}

const JWTtoken= "I love JWt"
class UserService{

    private static HashPassword(salt:string,password:string){
        
        const hashedpassword=createHmac('sha256',salt).update(password).digest('hex')
        return hashedpassword
    }

    public static createUser(payload:createUserPayload){
        const {firstName,lastname,email,password}=payload
        const salt = randomBytes(32).toString('hex')
       const hashedpassword= UserService.HashPassword(salt,password)
        return prismaClient.user.create({
            data:{
                firstName,lastname,email,password:hashedpassword ,salt,
            }   
        })
    }   

    private static getUserByEmail(email:string){
        return prismaClient.user.findUnique({ where: { email }})
    } 

    public static async getUserToken(payload:getUserPayload){
        const {email,password}= payload;
        const user=await UserService.getUserByEmail(email)
        if(!user){throw new Error("User Not Found") };
        const salt = user.salt;
        const HashPassword= UserService.HashPassword(user.salt,password)

        if(HashPassword!==user.password){
            throw new Error("Authentication Error")
        }
        // generate Token
        const token = JWT.sign({id:user.id,email:user.email},JWTtoken)
        return token
    }

}

export default UserService