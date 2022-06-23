import mongoose, { Document, Schema } from "mongoose";

const BookSchema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export interface IBook {
    title: string;
    author: string;
}

export interface IBookModel extends IBook, Document {

}

export default mongoose.model<IBookModel>('Book', BookSchema);