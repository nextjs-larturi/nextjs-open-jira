import { EntriesState } from '.';
import { Entry } from '../../interfaces';

type EntriesActionType = 
    | { type: 'ADD_ENTRY', payload: Entry }

export const EntriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
    switch (action.type) {
        case 'ADD_ENTRY':
            return {
               ...state,
                entries: [...state.entries, action.payload]
            };

        default:
            return state;
    }
};