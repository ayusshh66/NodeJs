const { log } = require("console");
const express = require("express")

const app = express();
const PORT = 8000;

const books = [{
    id : 1,
    title :"game of thrones",
    author : "schemender"
},
{
    id : 5,
    title :"game of prone",
    author : "charles"
},
{
    id : 4,
    title :"game of greed",
    author : "abigal"
},
{
    id : 3,
    title :"game of games",
    author : "dutch"
},
{
    id : 2,
    title :"game of cars",
    author : "jk"
}]


// MIDDLEWARE (PLUGINS)
app.use(express.json());




// ROUTES
app.get('/books',(req,res) => {
    // console.log(app.body);
    
    return res.status(200).json(books)
})

app.get('/books/:id', (req,res) => {
    const bookId = Number(req.params.id); // we need to state it as number else it will give bug, cuz .params gives value as a string
    const book = books.find((e) => e.id === bookId); // THIS WILL GIVE THE VALUE THAT IS BEEN SATISFIEND DUE TO FUNCTION
    
    if(isNaN(bookId)) {return res.status(400).json({error : `the id should only be a number`})} 
    
    if(!book){
        return res.status(404)
        .json({error : `the book is not there with id number ${bookId}`})
    }
    

    return res.json(book);
})

app.post('/books', (req,res) => {
    // console.log(req.headers);
    // console.log(req.body);

    const {title , author} = req.body;

    if(!title || title === ""){
        return res.status(400).json({error : "title is reqyuired in this field"})
    }

    if(!author || author === ""){
        return res.status(400).json({error : "author is required in this field"})
    }

    const id = books.length+1;
    const book = {id,title,author}

    books.push(book);


    return res.status(201).json({message :  `the book has been created successfully `, id : `${id}`})
    

});

app.delete('/books/:id', (req,res) => {
    const id = Number(req.params.id);
    if(isNaN(id)) res.status(400).json({message : "the id should be in Number"})

    const deleteBook = books.findIndex((e) => e.id === id);

    books.splice(deleteBook,1)

    res.status(200).json({message : "the book has been deleted"})

})

app.listen(PORT, () => {
    console.log(`the server is running on port : ${PORT}`);
    
})