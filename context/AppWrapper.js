import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [richTextMedia, setRichTextMedia] = useState({
    intent: false,
    src: null,
  });
  const [globalState, setGlobalState] = useState({
    drawerOpen: false,
    mediaGalleryFieldSelected: null,
    repeaterMeta: null,
    expandedRichText: false,
    richTextSelectedFieldName: null,
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
    handleExpandedRichText: (bool, value) => {
      setGlobalState({
        ...globalState,
        expandedRichText: bool,
        richTextSelectedFieldName: value,
      });
    },
    handleRichTextImageIntent: (value) => {
      setRichTextMedia({
        ...richTextMedia,
        intent: value,
      });
    },
    handleRichTextImageSource: (value) => {
      setRichTextMedia({
        ...richTextMedia,
        src: value,
      });
    },
    handleRepeaterMeta: (value) => {
      setGlobalState({
        ...globalState,
        repeaterMeta: value,
      });
    },
  };

  return (
    <AppContext.Provider value={{ globalState, richTextMedia, handlers }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
