import express, { Request, Response } from "express";
import Redis from "ioredis"

const app = express();

const PORT = process.env.PORT || 3000;

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.get("/redis", async(req : Request,res : Response) => {
    const reply = await redis.ping();
    res.json({redis : reply})
}) 

app.listen(PORT, () => {
    console.log("the server is up and running!")
})