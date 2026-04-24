// MIDDLEWARE (PLUGINS) number 1
// exports.jsonConvertor = (express.json());

//Middleware 2
exports.loggermiddleware = function((req,res,next) => {
    const log = `[${Date.now()}] ${req.method}    ${req.path}`
        fs.appendFileSync('activity.txt', log , "utf-8");
        next();
})