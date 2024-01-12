import mongoose, { Document, Schema } from 'mongoose';

// Define the BlogPost schema
export interface UserDocument extends Document {
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Create and export the User model
export const BlogModel = mongoose.model<UserDocument>('User', UserSchema);
