import express, {Request, Response} from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 6000;

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

const QUEUE_KEY = "queue:emails"

app.post("/emails", async(req:Request, res: Response) => {

    const job = {
        job : req.body.job,
        subject : req.body.subject || "No subject",
        body : req.body.body || "No content",
        createdAt : new Date().toLocaleString(),
    }

    const data = await redis.lpush(QUEUE_KEY, JSON.stringify(job));

    return res.json({status : "success", data })

})

app.get("/emails/process-one", async(req:Request, res:Response) => {

    const rawjob = await redis.rpop(QUEUE_KEY);

    if(!rawjob){
        return res.json({message : "no jobs in queue"})
    }

    const jobs = JSON.parse(rawjob);

    return res.json({status : "success", email : jobs })

})

app.listen(PORT, () => {

    console.log(`The server is up and running at : ${PORT}`)

})