import React, { createContext, useContext, useState } from "react";

type AppTypes = {
  user: any;
  setuser: React.Dispatch<React.SetStateAction<any>>;
};

const AppContext = createContext<AppTypes | undefined>(undefined);

export const Appprovider = ({ children }: { children: React.ReactNode }) => {
 const [user, setuser] = useState<any>(() => {
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved) : null;
});


  return (
    <AppContext.Provider value={{ user, setuser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useUserDetails = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useUserDetails must be used within AppProvider");
  }
  return context;
};
