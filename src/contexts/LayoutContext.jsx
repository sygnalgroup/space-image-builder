import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const LayoutContext = createContext(null);

export function LayoutContextProvider({ children }) {
  const [menuVisible, setMenuVisible] = useState(window.innerWidth > 768);

  const handleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <LayoutContext.Provider value={{ menuVisible, handleMenu }}>
      {children}
    </LayoutContext.Provider>
  );
}
