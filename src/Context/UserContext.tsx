import { AxiosError } from 'axios';
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { auth } from '../api/api';
import { IDatabase } from './DatabaseContext';

export interface IUser {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    token: string;
  }

}


export interface IUserConnections extends IUser {
  databases: IDatabase[]
  isRandomPassword: boolean;
}


interface IUserContext {
  userConnections: IUserConnections | null;
  setUserConnections: (d: IUserConnections | null) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  handleLogin: (
    username: string,
    password: string,
    history: { push: (url: string) => void }) => Promise<void | { message: string }>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const [userConnections, setUserConnections] = useState<IUserConnections | null>(null);

  const handleLogin = async (
    username: string,
    password: string,
    history: { push: (url: string) => void }
  ) => {

    return auth(username, password)
      .then(({ data }) => {
        setUser(data);
        localStorage.setItem('user', data.token);
        history.push('/');
      }).catch(({ response }: AxiosError) => {
        const data = response?.data as { message: string };
        throw new Error(data.message);
      });
  };

  const handleLogOut = (history: { push: (url: string) => void }) => {
    localStorage.removeItem('user');
    setUser(null);
    history.push('/auth/Signin');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        userConnections,
        setUserConnections
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
