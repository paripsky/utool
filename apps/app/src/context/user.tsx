import React, { createContext, useContext, useState } from 'react';

import http from '../utils/http';
import { setHTTPClientToken } from '../utils/http';
import useFetch from '../utils/useFetch';

export type User = {
  id: string;
  email: string;
};

type UserContext = {
  user: User | null;
  token: string | null;
  loadingUser: boolean;
  setToken: (token: string) => void;
  clearUser: () => void;
};

const userContext = createContext<UserContext>({
  user: null,
  token: null,
  loadingUser: false,
  setToken: () => {},
  clearUser: () => {},
});

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

const tokenFromLocalStorage = localStorage.getItem('token');

export const UserProvider: React.FC = ({ children }) => {
  // const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(tokenFromLocalStorage);
  const {
    data: user,
    reset: resetUser,
    refetch: refetchUser,
    loading: loadingUser,
    error,
  } = useFetch<User | null>(
    async function getUser() {
      if (!token) return;
      const { data: user } = await http.get('/api/user/getData');
      return user;
    },
    { fetchOnInit: !!token },
  );

  function tokenChanged(token: string) {
    setToken(token);
    localStorage.setItem('token', token);
    setHTTPClientToken(token);
    refetchUser();
  }

  function clearUser() {
    setToken(null);
    localStorage.removeItem('token');
    resetUser();
  }

  return (
    <userContext.Provider
      value={{ user, loadingUser, token, setToken: tokenChanged, clearUser }}>
      {children}
    </userContext.Provider>
  );
};
