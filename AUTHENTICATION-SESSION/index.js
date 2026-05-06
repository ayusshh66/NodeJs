import express from "express";
const app = express();
const PORT = process.env.PORT ?? 8001;
import db from './db/index.js'
import {usersTable, userSession} from './db/schema.js'
import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "node:crypto";
import jwt from 'jsonwebtoken'
// import { useTransition } from "react";
// import { stat } from "node:fs";

app.use(express.json());


// it is a global middleware, here the req.user is a global valriable and can be used in other methods
app.use( async (req,res, next) => {
    
    try{
        // const sessionId = req.headers["session-id"];
    const tokenHeader = req.headers['authorization'];

    if(!tokenHeader){
        return  next();
    }

    if(!tokenHeader.startsWith('Bearer')){
        return res.status(400).json({error : `token must start with "Bearer"`})
    }

    const token = tokenHeader.split(' ')[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET)


    // console.log("1. sessionId from header:", sessionId)
    //  if(!sessionId){
    //     return next();
    //  }

    // const [data] = await db.select({
    //     sessionId : userSession.id,
    //     id : usersTable.id,
    //     email : usersTable.email,
    //     name : usersTable.name,
    // }).from(userSession).rightJoin(usersTable, eq(usersTable.id, userSession.userId)).where(eq(userSession.id,sessionId));
    // console.log("data:", data)

    

    //  if(!data || !data.id){
    //     console.log("3. FAILED - no data or no id")
    //     return next();
    //  }

     req.user = decode;
     console.log("4. SUCCESS - req.user set")
     next();
    }catch(err){
        next();
    }
})

app.patch('/', async(req,res) =>{
const user = req.user
    

    if(!user) {
        return res.status(400).json({message : `you are not logged in`})
    }

    const {name} = req.body;
    console.log(name)
    await db.update(usersTable).set({name}).where(eq(usersTable.id, user.id))

    return res.json({status : "success"})

})



app.get('/', async(req,res) => {

    const user = req.user;
    // const sessionId = req.headers["session-id"];
    // console.log("data:", user); 
    if(!user) return res.status(401).json({message : `you are not logged in`});

    // const [data] = await db.select({id : userSession.id,
    //     sessionId : userSession.id,
    //     id : usersTable.id,
    //     email : usersTable.email,
    //     name : usersTable.name,
    // }).from(userSession).rightJoin(usersTable, eq(usersTable.id, userSession.userId)).where(eq(userSession.id,sessionId));
    // console.log("sessionId:", sessionId);  // add this
    // console.log("data:", data);  

    // if(!data || !data.userId) return res.status(401).json({message : `you are not logged in`});

    res.json({ user })

})


app.post('/signup', async (req,res) => {
    const {name, email, password} = req.body;
    const [existingUser] = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if(existingUser) return res.status(400).json({error : `this ${email} is already exists`});

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
    const [existingUser] = await db.select({ id : usersTable.id,email : usersTable.email, salt : usersTable.salt, password : usersTable.password}).from(usersTable).where(eq(usersTable.email, email)); //SELECT ALWAYS RETURN AN ARRAY [{},{},]
    if(!existingUser) return res.status(404).json({error : `there is no user with ${email}`})
    const salt = existingUser.salt;
    const existingHash = existingUser.password;

    const newHash = createHmac('sha256', salt ).update(password).digest('hex');

    if(newHash !== existingHash) return res.status(400).json({message : `incorrect password`});

    // const [session] = await db.insert(userSession).values({
    //     userId : existingUser.id,

    // }).returning({id : userSession.id})

    const payload = {
        id : existingUser.id,
        email : existingUser.email,
        name : existingUser.name,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET)

    return res.json({status : `success`, token})
    
    
})
app.listen(PORT, () => console.log(`status : server is running on port ${PORT}`))  