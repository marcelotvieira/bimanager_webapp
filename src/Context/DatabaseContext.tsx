import React, { ReactNode, createContext, useContext, useState } from 'react';
import { getQueryData } from '../api/api';

export interface IDatabase {
  id: number;
  name: string;
  queries: IQuery[]
}

export interface IQuery {
  id: number,
  name: string,
  isCompatibleWithPeriod: boolean;
  chartYAxisKey: string;
  chartXAxisKey: string;
}

export interface IDatabase {
  id: number;
  name: string;
  queries: IQuery[]
}

interface IDatabaseContext {
  database: IDatabase | null;
  setDatabase: (database: IDatabase | null) => void;
  currentQuery: IQuery | null;
  setCurrentQuery: (query: IQuery | null) => void;
  queryData: IGenericQueryRowData[] | null;
  setQueryData: (d: IGenericQueryRowData[] | null) => void;
  getData: (c: number, q: number, t: string) => Promise<void>;
  initialDate: Date | null;
  finalDate: Date | null;
  setInitialDate: (d: Date) => void;
  setFinalDate: (d: Date) => void;
  isLoading: boolean;
  setIsLoading: (l: boolean) => void;
}

export interface IGenericQueryRowData {
   [key: string]: string | number | null ;
}

const DatabaseContext = createContext<IDatabaseContext | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({
  children }) => {
  const [database, setDatabase] = useState<IDatabase | null>(null);

  const [currentQuery, setCurrentQuery] = useState<IQuery | null>(null);

  const [queryData, setQueryData] = useState<IGenericQueryRowData[] | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [initialDate, setInitialDate] = useState<Date>(() => {
    const now = new Date();
    now.setDate(1);
    return now;
  });
  const [finalDate, setFinalDate] = useState<Date>(new Date());

  const getData = (
    connectionId: number,
    queryId: number,
    token: string,
  ) => 
    getQueryData(
      connectionId,
      queryId,
      token,
      initialDate.toISOString().split('T')[0],
      finalDate.toISOString().split('T')[0],
    )
      .then(({ data }) => setQueryData(data))
      .catch((err) => console.log(err.message));
  

  return (
    <DatabaseContext.Provider
      value={{ 
        isLoading,
        setIsLoading,
        initialDate,
        finalDate,
        setInitialDate,
        setFinalDate,
        queryData,
        setQueryData,
        database,
        setDatabase,
        setCurrentQuery,
        currentQuery,
        getData,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
  
};

export const useDatabases = (): IDatabaseContext => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabse must be used within a DatabaseProvider');
  }
  return context;
};