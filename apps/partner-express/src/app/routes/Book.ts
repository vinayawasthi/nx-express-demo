//import express  from 'express';
import express = require('express');
import controller from '../controllers/Book';

const router = express.Router();

router.get('/book/author/:authorId', controller.getBookByAuthor);
router.get('/book/:bookId', controller.getBook);
router.get('/book/', controller.getAllBook);
router.post('/book/', controller.createBook);
router.patch('/book/:bookId', controller.updateBook);
router.delete('/book/:bookId', controller.deleteBook);

export default router;