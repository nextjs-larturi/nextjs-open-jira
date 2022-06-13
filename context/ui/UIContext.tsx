import {createContext} from 'react';

interface UIContextProps {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;

    // Methods
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAddingEntry: (isAddingEntry: boolean) => void;
}

export const UIContext = createContext<UIContextProps>({} as UIContextProps);
