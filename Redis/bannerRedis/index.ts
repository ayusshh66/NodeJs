import express, { Request, Response } from "express";
import Redis from "ioredis"

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3000;

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const BANNER_KEY = "app:banner"

app.get("/redis", async(req : Request,res : Response) => {
    const reply = await redis.ping();
    res.json({redis : reply})
}) 

app.post("/banner", async(req:Request, res : Response) =>{

    await redis.set(BANNER_KEY, req.body.message || "Welcome to My website!!")

    res.json({status : "success"})

})

app.get("/banner", async(req: Request, res : Response) => {

    const message = await redis.get(BANNER_KEY);

    res.json({status : "success",  message})

})  

app.delete("/banner", async(req:Request , res : Response) => {

    await redis.del(BANNER_KEY);

    res.json({status : "success"})

})

app.get("/banner/exists", async(req: Request, res: Response) => {

    const banner = await redis.exists(BANNER_KEY);
    res.json({status : "success", exists : Boolean(banner)})

})


app.listen(PORT, () => {
    console.log(`the server is up and running! at port : ${PORT}`)
})