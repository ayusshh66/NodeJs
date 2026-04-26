const {pgTable, uuid, varchar, text} = require("drizzle-orm/pg-core");

const booksTable = pgTable('books',{
    id : uuid().primaryKey().defaultRandom(),
    title : varchar({length : 100}).notNull(),
    description : text(),
    authorId : 
})