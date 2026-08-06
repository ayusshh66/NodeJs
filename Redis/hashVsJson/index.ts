import express, {Request, Response} from "express";
import Redis from "ioredis";
import { json } from "node:stream/consumers";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.post("/user/:id/json", async(req:Request, res: Response) => {

    const {id} = req.params;

    const data = await redis.set(`user:${id}`, JSON.stringify(req.body));

    return res.json({status : "success", savedAs : "Json"})

})

app.get("/user/:id/json", async(req:Request, res:Response) => {

    const id = req.params.id;

    const data = await redis.get(`user:${id}`);

    return res.json({status : "success", user : data && JSON.parse(data)})

})

app.post("/user/:id/hash", async(req:Request, res:Response) => {

    const id = req.params.id;

    const data = await redis.hset(`user:${id}`, req.body);

    return res.json({status : "success",data })

})




app.listen(PORT, () => {

    console.log(`the server is up and running at port : ${PORT}`)

})