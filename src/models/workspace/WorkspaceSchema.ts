import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate";

const Schema = mongoose.Schema;

export const WorkspaceSchema = new Schema( {
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now,
    }
});

WorkspaceSchema.plugin(mongoosePaginate);