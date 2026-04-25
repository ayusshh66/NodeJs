// MIDDLEWARE (PLUGINS) number 1
// exports.jsonConvertor = (express.json());

const fs = require("node:fs")

//Middleware 2
exports.loggermiddleware = ((req,res,next) => {
    const log = `[${Date.now()}] ${req.method}    ${req.path}`
        fs.appendFileSync('activity.txt', log , "utf-8");
        next();
})