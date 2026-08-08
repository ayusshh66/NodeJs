import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const publisher = new Redis({
  host: "localhost",
  port: 6379,
});

app.post("/notification", async (req, res) => {
  const paylaod = {
    title : req.body.title,
    createdAt : new Date().toLocaleDateString(),
  }

  const receiver = await publisher.publish("notification", JSON.stringify(paylaod));

  return res.status(200).json({ message: "Notification published", receiver });
  
});

app.listen(3000, () => {
  console.log("Publisher service is running on port 3000");
});
