import mongoose, { Model, Schema } from 'mongoose';
import { Entry } from '../interfaces';

interface iEntry extends Entry {};

const entrySchema = new Schema({
    description: { type: String, required: true },
    createdAt: { type: Number, required: true },
    status: { 
        type: String, 
        required: true,
        enum: {
            values: ['pending', 'in-progress', 'completed'],
            message: '{VALUE} must be one of: pending, in-progress, completed'
        }
    },
});

const EntryModel: Model<iEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;