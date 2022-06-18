import mongoose, { Model, Schema } from 'mongoose';
import { Entry } from '../interfaces';

export interface iEntry extends Entry {};

const entrySchema = new Schema({
    description: { type: String, required: true },
    createdAt: { type: Number, required: true },
    status: {
        type: String, 
        required: true,
        enum: {
            values: ['pending', 'in-progress', 'completed', 'deleted'],
            message: '{VALUE} must be one of: pending, in-progress, completed, deleted'
        },
        default: 'pending'
    },
});

const EntryModel: Model<iEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;