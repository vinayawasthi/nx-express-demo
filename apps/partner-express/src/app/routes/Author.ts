import express = require('express');
import controller from '../controllers/Author';

const router = express.Router();

router.get('/author/:authorId', controller.getAuthor);
router.get('/author/', controller.getAllAuthor);
router.post('/author/', controller.createAuthor);
router.patch('/author/:authorId', controller.updateAuthor);
router.delete('/author/:authorId', controller.deleteAuthor);

export default router;