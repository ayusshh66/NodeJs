const { log } = require("console");
const express = require("express")
const fs = require("node:fs");
const bookRouter = require("./routes/bookRoutes.js");
const { loggermiddleware } = require("./middleware/logger");
require("dotenv/config");

const app = express();
const PORT = 8000;




// MIDDLEWARE (PLUGINS) number 1
app.use(express.json());

//Middleware 2
app.use(loggermiddleware)



// ROUTES
app.use('/books', bookRouter )

app.listen(PORT, () => {
    console.log(`the server is running on port : ${PORT}`);
    
})
