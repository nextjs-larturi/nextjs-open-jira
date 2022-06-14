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
            description: 'Esta es mi pendiente',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'Esta es mi pendiente',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'Esta es mi pendiente',
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

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        };

        dispatch({
            type: 'ADD_ENTRY',
            payload: newEntry,
        });
    };

    const updateEntry = (entry: Entry) => {
        dispatch({
            type: 'UPDATE_ENTRY',
            payload: entry,
        });
    };

    return (
        <EntriesContext.Provider value={{
            ...state,
            
            // Methods
            addNewEntry,
            updateEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    );
};