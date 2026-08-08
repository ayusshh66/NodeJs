import Redis from "ioredis";

const subscriber = new Redis({
  host: "localhost",
  port: 6379,
});

subscriber.subscribe("notification", (err) => {
    if (err) { 
        console.log({ error: "Failed to subscribe to notification channel" });
    }

    console.log("Subscribed to notification channel");
});

subscriber.on("message", (channel, message) => {
    console.log(`Received message from channel ${channel}: ${message}`);
});