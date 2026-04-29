const express = require("express");
// const {books} = require("../models/books.model")
const router = express.Router();
const PORT = 8000;
const controller = require("../controllers/book.controller")


router.get('/',controller.getBooks)

router.get('/:id', controller.getBookById)

router.post('/',controller.postBook);

router.delete('/:id', controller.deleteBooks)


module.exports = router;