const {pgTable, uuid, varchar, text} = require("drizzle-orm/pg-core");

const authorTable = pgTable('authors',{
    id : uuid().primaryKey().defaultRandom(),
    fristName : varchar({ length : 55 }),
    lastName : varchar({ length : 55}),
    email : varchar({length : 255}).notNull().unique()

})

module.exports = authorTable;