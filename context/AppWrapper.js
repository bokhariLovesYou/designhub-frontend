import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [globalState, setGlobalState] = useState({
    drawerOpen: false,
    mediaGalleryFieldSelected: null,
  });

  const handlers = {
    handleDrawer: (value) => {
      if (globalState.drawerOpen) {
        setGlobalState({
          ...globalState,
          drawerOpen: false,
          mediaGalleryFieldSelected: null,
        });
      } else {
        setGlobalState({
          ...globalState,
          drawerOpen: true,
          mediaGalleryFieldSelected: value,
        });
      }
    },
  };

  return <AppContext.Provider value={{ globalState, handlers }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
