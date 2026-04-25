require("dotenv/config")
const { usersTable } = require("./drizzle/schema")
const db = require("./mydb/index")


const getAllUsers = async () => {
    const users = await db.select().from(usersTable);
    console.log(users)
    return users;


}

const createUsers = async ( {name, email} ) => {
    await db.insert(usersTable).values({
        id : Math.floor(Math.random()*10-1),
        name,
        email,
    });
    console.log("created")
}

// createUsers({name : "akku", email : "aadoniss@sample.com"})

getAllUsers();