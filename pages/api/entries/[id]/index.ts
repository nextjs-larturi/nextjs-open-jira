import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { Entry } from '../../../../models';
import { iEntry } from '../../../../models/Entry';

type Data = 
    | { message: string }
    | iEntry;


export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    // const { id } = req.query;
   
    // if(!mongoose.isValidObjectId(id)) {
    //     return res.status(400).json({ message: 'Invalid id' });
    // }

    switch (req.method) {
        case 'GET':
            return getEntryById(req, res);

        case 'PUT':
            return updateEntry(req, res);
    
        default:
            return res.status(400).json({ message: 'Metodo no existente' });
    }
}

const getEntryById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();
    const entry = await Entry.findById(id);
    await db.disconnect();

    if (!entry) {
        return res.status(404).json({ message: 'Entry not found' });
    } 
    
    return res.status(200).json(entry);
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById(id);

    if (!entryToUpdate) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con el id ' + id });
    }

    const { 
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, 
            { description, status }, 
            { new: true, runValidators: true }
        );
        await db.disconnect();
        res.status(200).json(updatedEntry!);
    } catch (error: any) {
        await db.disconnect();
        return res.status(400).json({ 
            message: error.errors.status.message
        });
    }
}