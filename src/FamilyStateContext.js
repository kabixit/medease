import React, { createContext, useContext, useState } from 'react';

const FamilyStateContext = createContext();
const FamilyDispatchContext = createContext();

export const useFamilyState = () => useContext(FamilyStateContext);
export const useFamilyDispatch = () => useContext(FamilyDispatchContext);

export const FamilyProvider = ({ children }) => {
  const [familyMembers, setFamilyMembers] = useState([]);

  return (
    <FamilyStateContext.Provider value={familyMembers}>
      <FamilyDispatchContext.Provider value={setFamilyMembers}>
        {children}
      </FamilyDispatchContext.Provider>
    </FamilyStateContext.Provider>
  );
};
