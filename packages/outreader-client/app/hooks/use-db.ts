import React, { useContext } from 'react';

export const DbContext = React.createContext<any>(null);
export function useDb() {
  return useContext(DbContext);
}
