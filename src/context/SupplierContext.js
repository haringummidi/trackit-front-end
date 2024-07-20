import React, { createContext, useContext, useState } from "react";

const SupplierContext = createContext();

export const useSupplierContext = () => useContext(SupplierContext);

export const SupplierProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([]);

  return (
    <SupplierContext.Provider value={{ suppliers, setSuppliers }}>
      {children}
    </SupplierContext.Provider>
  );
};
