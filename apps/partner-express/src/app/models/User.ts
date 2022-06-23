import mongoose, { Document, Schema } from "mongoose";

const UserSchema = new Schema(
    {
        first_name: { type: String, required: true, minLength: 2, maxLength: 50 },
        last_name: { type: String, required: true, minLength: 2, maxLength: 50 },
        birth_date: { type: Date },
        profile_photo: { type: String },
        email: { type: String, max: 30 },
        password: { type: String, minLength: 5, maxLength: 15 },
        last_password_update_at: { type: Date },
        last_access_date: { type: Date },
        locked: { type: Boolean, default: false },
        lockedAt: {
            type: Date,
            default: function () {
                if (this.locked) {
                    return Date.now();
                }
                return null;
            }
        },
        status: {
            type: String, status: {
                type: String,
                enum: ['draft', 'pending', 'active', 'deleted', 'disabled'],
                default: 'draft'
            }
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export interface IUser {
    first_name:string,
    last_name:string,
    birth_date?:Date,
    profile_photo?:string,
    email:string,
    password:string,
    last_password_update_at?:Date,
    last_access_date?:Date,
    locked:boolean,
    lockedAt?:Date,
    status:'draft'|'pending'|'active'|'deleted'|'disabled'
}

export interface IUserModel extends IUser, Document {

}

export default mongoose.model<IUserModel>('User', UserSchema);