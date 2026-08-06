import express, { Response, Request } from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

function otpKey(phone : Number){

    return `otp : ${phone}`

}

app.post("/otp", async( req:Request , res: Response) =>{

    const {phone} = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await redis.set(otpKey(phone), otp, "EX", 30) // otp expires in 30 seconds

    res.json({status : "success", otp})

})

app.post("/otp/verification", async(req:Request, res : Response) => {

    const {phone, otp} = req.body;
    const savedOtp = await redis.get(otpKey(phone));

    if(!savedOtp){
        return res.json({status : "failed", message : "otp expired"})
    }

    if(savedOtp !== otp){
        return res.json({status : "failed", error : "otp is wrong"})
    }

    await redis.del(otpKey(phone));

    res.json({status : "success", message : "otp verified and deleted now"})

})

app.get("/otp/:phone/ttl", async(req:Request, res: Response) => {

    // const {phone} = req.params;
    const ttl = await redis.ttl(otpKey(Number(req.params.phone)));

    return res.json({ttl})

})

app.listen(PORT, () => {

    console.log(`the server is up and running at PORT : ${PORT}`)

})