const {drizzle} = require("drzzle-orm/node-postgres")

const db = drizzle(process.env.DATABASE_ULR);

module.exports = db;