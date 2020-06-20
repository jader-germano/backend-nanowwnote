import * as mongoose from 'mongoose';

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