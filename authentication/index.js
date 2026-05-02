import  express from 'express'
const app = express()
const port = 8000;
//middleware
app.use(express.json())

const diary = {};
const EMAILS = new Set();


app.post('/signup', (req,res) => {
    const {name, email, password} = req.body;
    if(EMAILS.has(email)) res.status(400).end(`the ${email} has already registered`);
    //creates a tocken for user
    const token = `${Date.now()}`;
    // entry
    diary[token] = {name, email, password};
    EMAILS.add(email)

    res.json({status : `success`, token})
})

app.post('/me', (req,res) => {
    const {tocken} = req.body;
    if(!tocken) res.status(400).json({error : 'missing tocken'});
    if(!(tocken in diary)) res.status(400).json({error : "invalid tocken"});

    const entry = diary[tocken];

    res.json({data: entry });
    
})

app.listen(port , () => console.log(`server has started on post ${port}`))


