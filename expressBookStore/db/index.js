// const {drizzle} = require("drizzle-orm/node-postgres")

// const db = drizzle(process.env.DATABASE_ULR);

// module.exports = db;

const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
require("dotenv/config");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

module.exports = db;