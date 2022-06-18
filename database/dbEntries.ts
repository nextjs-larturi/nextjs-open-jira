import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { Entry, iEntry } from '../models';

export const getEntriesById = async (id: string): Promise<iEntry | null> => {

    if(!isValidObjectId) return null;

    await db.connect();
    const entry = await Entry.findById(id).lean();
    await db.disconnect();

    return JSON.parse(JSON.stringify(entry));
}
