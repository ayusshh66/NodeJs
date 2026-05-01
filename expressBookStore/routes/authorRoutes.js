const express = require('express')
const router = express.Router()
const {getAuthor, getAuthorById, postAuthor} = require('../controllers/author.controller')


router.get('/', getAuthor);
router.get('/:id', getAuthorById);
router.post('/',postAuthor);

module.exports = router;