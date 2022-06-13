import { UIState } from '.';

type UIActionType = 
    | { type: 'UI_OPEN_SIDEBAR' }
    | { type: 'UI_CLOSE_SIDEBAR' }
    | { type: 'UI_SET_IS_ADDING_ENTRY', payload: boolean }
    | { type: 'UI_START_DRAGGING'}
    | { type: 'UI_END_DRAGGING'}
    
export const UIReducer = (state: UIState, action: UIActionType): UIState => {
    switch (action.type) {
        case 'UI_OPEN_SIDEBAR':
            return {
                ...state,
                sidemenuOpen: true
            };
        case 'UI_CLOSE_SIDEBAR':
            return {
                ...state,
                sidemenuOpen: false
            };
        case 'UI_SET_IS_ADDING_ENTRY':
            return {
                ...state,
                isAddingEntry: action.payload
            };
        case 'UI_START_DRAGGING':
            return {
                ...state,
                isDragging: true
            };
        case 'UI_END_DRAGGING':
            return {
                ...state,
                isDragging: false
            };
        default:
            return state;
    }
};