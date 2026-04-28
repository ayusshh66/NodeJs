// const {books} = require("../models/books.model")
const db = require('../db');
const booksTable = require("../models/books.model");
const {eq} = require("drizzle-orm") // eq stands for equal


exports.getBookById = async function (req,res) {
    // const bookId = Number(req.params.id); // we need to state it as number else it will give bug, cuz .params gives value as a string
    const bookId = req.params.id;
    // const book = books.find((e) => e.id === bookId); // THIS WILL GIVE THE VALUE THAT IS BEEN SATISFIEND DUE TO FUNCTION
    const [book] = await db.select().from(booksTable).where(table => eq(table.id, bookId)).limit(1); // table refers to the booksTable
    // “Take the first item from the array and store it in book” ==> logic for [book]
    
    // if(isNaN(bookId)) {return res.status(400).json({error : `the id should only be a number`})} 
    
    if(!book){
        return res.status(404)
        .json({error : `the book is not there with id number ${bookId}`})
    }
    

    return res.json(book);
}

exports.getBooks = async (req,res) => {
    // console.log(app.body);
    
    // return res.status(200).json(books)
    const books = await db.select().from(booksTable)
    return res.json(books)
}

exports.postBook = async (req,res) => {
    // console.log(req.headers);
    // console.log(req.body);

    const {title , authorId, description} = req.body;

    if(!title || title === ""){
        return res.status(400).json({error : "title is required in this field"})
    
    }

    const [result] = await db.insert(booksTable).values({
        title,
        authorId,
        description,
    })
    .returning({id : booksTable.id})
    // if(!author || author === ""){
    //     return res.status(400).json({error : "author is required in this field"})
    // }

    // const id = books.length+1;
    // const book = {id,title,author}

    // books.push(book);


    return res.status(201).json({message :  `the book has been created successfully `, id : result.id})
    

}

exports.deleteBooks = async (req,res) => {
    const id = req.params.id;
    // if(isNaN(id)) res.status(400).json({message : "the id should be in Number"})

    // const deleteBook = books.findIndex((e) => e.id === id);
    const deleteBook = await db.delete(booksTable).where(eq(booksTable.id , id))

    books.splice(deleteBook,1)

    res.status(200).json({message : "the book has been deleted"})

}