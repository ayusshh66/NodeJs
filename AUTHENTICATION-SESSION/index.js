import express from "express";
const app = express();
const PORT = process.env.PORT ?? 8001;
import db from './db/index.js'
import {usersTable} from './db/schema.js'
import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "node:crypto";
import { stat } from "node:fs";

app.use(express.json());

app.post('/signup', async (req,res) => {
    const {name, email, password} = req.body;
    const [existingUser] = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if(existingUser) res.status(400).json({error : `this ${email} is already exists`});

    const salt = randomBytes(256).toString('hex');
    const hashedPassowrd = createHmac('sha256', salt ).update(password).digest('hex');
    const [user] =  await db.insert(usersTable).values({
        name,
        email,
        password : hashedPassowrd,
        salt,

    }).returning({id : usersTable.id});

    return res.status(201).json({status : `success`, data : {userId : user.id}})



})

app.post('/login', async(req,res) => {
    const {email, password} = req.body;
    const [existingUser] = await db.select({email : usersTable.email, salt : usersTable.salt, password : usersTable.password}).from(usersTable).where(eq(usersTable.email, email)); //SELECT ALWAYS RETURN AN ARRAY [{},{},]
    if(!existingUser) res.status(404).json({error : `there is no user with ${email}`})
    const salt = existingUser.salt;
    const existingHash = existingUser.password;

    const newHash = createHmac('sha256', salt ).update(password).digest('hex');

    if(newHash !== existingHash) res.status(400).json({message : `incorrect password`});

    return res.json({status : `success`})
    
    
})
app.listen(PORT, () => console.log(`status : server is running on port ${PORT}`))