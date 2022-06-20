import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import Book, { IBook } from '../models/Book';

const createBook = (req: Request, res: Response, next: NextFunction) => {
    const { title, author } = req.body as IBook;
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        author: author
    });

    return book.save()
        .then((book) => { res.status(200).json({ book }) })
        .catch((error) => { res.status(500).json({ error }) });
};

const updateBook = (req: Request, res: Response, next: NextFunction) => {
    const { bookId } = req.params;
    return Book.findById(bookId).
        then((book) => {
            if (book) {

                const { title, author } = req.body;
                book.set({ title: title, author: author });

                return book.save()
                    .then((author) => { res.status(201).json({ author }) })
                    .catch((error) => { res.status(500).json({ error }) });
            } else {
                res.status(404).json({ message: "no found" })
            }
        }).catch((error) => {
            res.status(500).json(error)
        });
};

const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    const { bookId } = req.params;
    return Book.findByIdAndDelete(bookId)
        .then((book) => {
            book ? res.status(201).json({ message: "deleted" })
                : res.status(404).json({ message: "no found" });
        })
        .catch((error) => res.status(500).json(error));
};

const getBook = (req: Request, res: Response, next: NextFunction) => {
    const { bookId } = req.params;
    return Book.findById(bookId)
        .populate('author')
        .then((book) => {
            book ? res.status(201).json({ book })
                : res.status(404).json({ message: "no found" });
        })
        .catch((error) => res.status(500).json(error));
};

const getAllBook = (req: Request, res: Response, next: NextFunction) => {
    return Book.find()
        .populate('author')
        .then((books) => {
            res.status(200).json({ books })
        })
        .catch((error) => { res.status(500).json({ error }) });
};

const getBookByAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { authorId } = req.params;
    return Book.find({ "author": authorId })
        .populate('author')
        .then((books) => {
            books ? res.status(201).json({ books })
                : res.status(404).json({ message: "no book found" });
        })
        .catch((error) => res.status(500).json(error));
};


export default {
    createBook,
    updateBook,
    deleteBook,
    getBook,
    getBookByAuthor,
    getAllBook
}