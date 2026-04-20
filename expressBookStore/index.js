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


app.get('/books',(req,res) => {
    return res.status(400).json(books)
})

app.get('/books/:id', (req,res) => {
    const bookId = Number(req.params.id); // we need to state it as number else it will give bug, cuz .params gives value as a string
    const book = books.find((e) => e.id === bookId); // THIS WILL GIVE THE VALUE THAT IS BEEN SATISFIEND DUE TO FUNCTION
    
    if(isNaN(bookId)) {return res.json({error : `the id should only be a number`})} 
    
    if(!book){
        return res.status(404)
        .json({error : `the book is not there with id number ${bookId}`})
    }
    

    return res.json(book);
})


app.listen(PORT, () => {
    console.log(`the server is running on port : ${PORT}`);
    
})