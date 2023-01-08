import { createContext, useContext, useState } from 'react';

import { TChildrenProp } from 'types';

type TSidePanelState = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

type TUIState = {
  sidePanel: TSidePanelState;
};

const initialState: TUIState = {
  sidePanel: {
    isOpen: false,
    toggle: () => {},
    close: () => {},
  },
};

const UIContext = createContext(initialState);

export const UIContextProvider = ({ children }: TChildrenProp) => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <UIContext.Provider
      value={{
        sidePanel: {
          isOpen: isSidePanelOpen,
          toggle: toggleSidePanel,
          close: () => setIsSidePanelOpen(false),
        },
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => useContext(UIContext);
