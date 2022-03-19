import React, { createContext, useContext, useState } from 'react';

export type User = {
  id: string;
  login: string;
  accessToken: string;
  avatar_url: string;
};

type UserContext = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const userContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
  clearUser: () => {},
});

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  const { user, clearUser, setUser } = context;

  return {
    user,
    setUser: (user: User) => {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    },
    clearUser,
  };
};

const userFromLocalStorage = localStorage.getItem('user');
const initialUser = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(initialUser);

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <userContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </userContext.Provider>
  );
};
