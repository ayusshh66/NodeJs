import express, {Request, Response} from "express";
import { emailQueue } from "./queue.ts";


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 7000;

app.post("/welcome-email", async(req:Request, res: Response) => {

    const job = emailQueue.add(
        "send-welcome-email",
        {
            to: req.body.to,
            subject : req.body.subject || "No subject",
            name : req.body.name
        },{
            attempts : 3,
            backoff : {
                type : "exponential",
                delay : 2000,
            }
        }
    )

    return res.json({status : "success", data : job})

})

app.listen(PORT, () => {

    console.log(`the server is up and running at port : ${PORT}`)

})