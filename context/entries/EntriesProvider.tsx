import { FC, useEffect, useReducer } from 'react';
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

    const addNewEntry = async (description: string) => {
        try {
            const { data } = await entriesApi.post<Entry>('/entries', { description });

            dispatch({
                type: 'ADD_ENTRY',
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const updateEntry = async ( {_id, description, status} : Entry) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
                description: description,
                status: status,
            });
            dispatch({
                type: 'UPDATE_ENTRY',
                payload: data,
            });
        } catch (error) {
            console.error(error);
        }
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