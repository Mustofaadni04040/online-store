import { createContext, useState } from "react";

const ToasterContext = createContext({
  toaster: {},
  setToaster: ({}) => {},
});

const ToasterProvider = ({ children }: { children: React.ReactNode }) => {
  const [toaster, setToaster] = useState({});

  return (
    <ToasterContext.Provider value={{ toaster, setToaster }}>
      {children}
    </ToasterContext.Provider>
  );
};

export { ToasterContext, ToasterProvider };
