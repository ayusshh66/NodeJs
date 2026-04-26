
const {pgTable,integer,varchar} = require("drizzle-orm/pg-core")

const usersTable =  pgTable("users", {
    id:integer().primaryKey(), //primary key means unique thing
    name : varchar({length:255}).notNull(), // not null means it should be filled, or its a required field
    email: varchar({length:255}).unique().notNull(),


     
})

module.exports = {usersTable,
};

