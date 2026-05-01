const { eq } = require('drizzle-orm')
const db = require('../db')
const {authorTable} = require('../models/author.model')
const {booksTable} = require('../models/books.model')


const getAuthor = async (req,res) => {
    const authors = await db.select().from(authorTable)
    return res.json(authors)
}


const getAuthorById = async (req,res) => {
    const id = req.params.id;
    const [authors] = await db.select().from(authorTable).where(eq(authorTable.id,id)).limit(1);

    if(!authors) res.status(404).end(`the author with ${id} does not exist`);

    return res.json(authors);
    


}

const postAuthor = async (req, res) => {
  const { fristName, lastName, email } = req.body;

  const [post] = await db
    .insert(authorTable)
    .values({ fristName, lastName, email })
    .returning({ id: authorTable.id });

  return res.json({ message: `author has been created with id: ${post.id}` });
};

const getBookByAuthorId = async (req,res) => {
    const id = req.params.id;
    const get = await db.select().from(booksTable).where(eq(booksTable.authorId,id));
    return res.json(get)
}

module.exports = {
    getAuthor,
    getAuthorById,
    postAuthor,
    getBookByAuthorId,
}



