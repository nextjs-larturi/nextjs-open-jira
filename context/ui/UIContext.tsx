import {createContext} from 'react';

interface UIContextProps {
    sidemenuOpen: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
}

export const UIContext = createContext<UIContextProps>({} as UIContextProps);
