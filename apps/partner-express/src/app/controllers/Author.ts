import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import Author, { IAuthor } from "../models/Author";

const createAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body as IAuthor;
    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name: name
    });
    return author.save()
        .then((author) => { res.status(201).json({ author }) })
        .catch((error) => { res.status(500).json({ error }) });
};
const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;
    return Author.findById(authorId)
        .then((author) => {
            if (author) {
                const { name } = req.body;
                author.set({ name: name });
                return author.save()
                    .then((author) => { res.status(201).json({ author }) })
                    .catch((error) => { res.status(500).json({ error }) });
            } else {
                res.status(500).json({ message: "not found" });
            }
        })
        .catch((error) => { res.status(500).json({ error }) });
};
const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;
    return Author.findByIdAndDelete(authorId)
        .then((author) => {
            author ? res.status(201).json({ message: "deleted" })
                : res.status(404).json({ message: "not found" })
        })
        .catch((error) => { res.status(500).json({ error }) });;
};
const getAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;
    console.log(req.params);
    return Author.findById(authorId)
        .then((author) => {
            author ? res.status(200).json({ author })
                : res.status(500).json({ message: "not found_" });
        })
        .catch((error) => { res.status(500).json({ error }) });
};
const getAllAuthor = (req: Request, res: Response, next: NextFunction) => {
    return Author.find()
        .then((authors) => {
            res.status(200).json({ authors })
        })
        .catch((error) => { res.status(500).json({ error }) });
};

export default { createAuthor, updateAuthor, deleteAuthor, getAllAuthor, getAuthor }