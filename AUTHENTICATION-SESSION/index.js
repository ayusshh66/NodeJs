import express from "express";
const app = express();
const PORT = process.env.PORT ?? 8001;
import db from './db'
import {usersTable} from './db/schema'
import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "node:crypto";

app.post('/signup', async (req,res) => {
    const {name, email, password} = req.body;
    const existingUser = await db.select().from({usersTable}).where(eq(usersTable.email, email));

    if(existingUser) res.status(400).json({error : `this ${email} is already exists`});

    const salt = randomBytes(256).toString('hex');
    const hashedPassowrd = createHmac('sha256', salt ).update(password).digest('hex');
    const [user] =  await db.insert(usersTable).value({
        name,
        email,
        password : hashedPassowrd,
        salt,

    }).returning({id : usersTable.id});

    return res.status(201).json({status : `success`, data : {userId : user.id}})



})
app.listen(PORT, () => console.log(`status : server is running on port ${PORT}`))