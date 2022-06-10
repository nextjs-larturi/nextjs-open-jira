import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, EntriesReducer } from './';
import { Entry } from '../../interfaces/entry';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Esta es mi descripción',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'Esta esta en proceso',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),
            description: 'Esta tarea esta finalizada',
            status: 'completed',
            createdAt: Date.now() -100000,
        },
    ],
}

interface Props {
    children: React.ReactNode;
}

export const EntriesProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(EntriesReducer, ENTRIES_INITIAL_STATE);

    return (
        <EntriesContext.Provider value={{
            ...state,
        }}>
            { children }
        </EntriesContext.Provider>
    )
};