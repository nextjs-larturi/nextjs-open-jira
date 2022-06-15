import { FC, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, EntriesReducer } from './';
import { Entry } from '../../interfaces/entry';
import { entriesApi } from '../../apis';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
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

    useEffect(() => {
        refreshEntries();
    }, []);

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({
            type: 'INITIAL_LOAD_ENTRY',
            payload: data,
        })
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