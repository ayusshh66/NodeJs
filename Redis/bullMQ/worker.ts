import {Worker} from "bullmq"
import {connection} from "./queue.ts"

const worker = new Worker(
    "emails",
    async(job) =>{
        console.log("processing email jobs", job.id, job.name, job.data)

        await new Promise((resolve) => setTimeout(resolve,5000))

        console.log("email job completed",job.id, job.name, job.data)
    },
    {
        connection
    }
)

worker.on("completed", (job) => {
    console.log("job completed",job.id, job.name, job.data)
})

worker.on("failed", (job) => {

    console.log("job failed", job?.id, job?.name, job?.data)

})