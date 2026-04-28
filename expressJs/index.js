// const { log } = require("console");
const express = require("express");

const app = express();

// IN EXPRESS THE STATUS(writehead) is defaul at 200
app.get('/', (req,res) => {
    res.end(`you are at home-page`)
})

app.get('/contact-us', (req,res) => {
    res.end('you can contact me in reddit dms')
})

app.post('/tweet', (req,res) => {
    res.status(201).end(`tweet-1 \n tweet-2`)
})

app.listen(8000, () => {
    console.log(`the server is running on port 8000`);
    
})

