import { FC, useReducer } from 'react';
import { UIContext, UIReducer } from './';

export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
}

interface Props {
    children: React.ReactNode;
}

export const UIProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({ type: 'UI_OPEN_SIDEBAR' });
    }

    const closeSideMenu = () => {
        dispatch({ type: 'UI_CLOSE_SIDEBAR' });
    }

    const setIsAddingEntry = (isAddingEntry: boolean) => {
        dispatch({ type: 'UI_SET_IS_ADDING_ENTRY', payload: isAddingEntry });
    }

    return (
        <UIContext.Provider value={{
            ...state,

            // Methods
            openSideMenu,
            closeSideMenu,
            setIsAddingEntry,
        }}>
            { children }
        </UIContext.Provider>
    )
};
