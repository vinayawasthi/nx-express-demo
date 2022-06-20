import mongoose, { Document, Schema } from "mongoose";

const AuthorSchema: Schema = new Schema(
    { name: { type: String, required: true } },
    { versionKey:false}
);

export interface IAuthor {
    name: string
}

export interface IAuthorModel extends IAuthor, Document { 
}

export default mongoose.model<IAuthorModel>('Author', AuthorSchema);