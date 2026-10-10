import { useState, type ReactNode } from 'react';
import userContext, { type User } from './userContext';

function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export default UserContextProvider;