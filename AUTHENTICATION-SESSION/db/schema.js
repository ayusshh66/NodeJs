
import { uuid,integer, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
//   age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password : text().notNull(),
  salt : text().notNull(),
});

export const userSession = pgTable('user_sessions',{
  id: uuid().primaryKey().defaultRandom(),
  userId : uuid().references(() => usersTable.id).notNull(), //It identifies which user this session belongs to
  createdAt : timestamp().defaultNow().notNull(),
})