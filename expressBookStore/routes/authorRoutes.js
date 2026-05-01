const express = require('express')
const router = express.Router()
const {getAuthor, getAuthorById, postAuthor,getBookByAuthorId} = require('../controllers/author.controller')


router.get('/', getAuthor);
router.get('/:id', getAuthorById);
router.post('/',postAuthor);
router.get('/:id/books', getBookByAuthorId)
module.exports = router;