import { FC, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';
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

    const { enqueueSnackbar } = useSnackbar();

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

    const updateEntry = async ( {_id, description, status} : Entry, showSnackbar = false) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
                description: description,
                status: status,
            });
            dispatch({
                type: 'UPDATE_ENTRY',
                payload: data,
            });

            if(showSnackbar) {
                enqueueSnackbar('Entry updated successfully', { 
                    variant: 'success',
                    autoHideDuration: 2000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteEntry = async (id: string) => {
        try {
            const { data } = await entriesApi.delete<Entry>(`/entries/${id}`);
            dispatch({
                type: 'DELETE_ENTRY',
                payload: data,
            });

            enqueueSnackbar('Entry deleted successfully', { 
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }
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
            deleteEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    );
};