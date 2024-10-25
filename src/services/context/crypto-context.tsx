import React, { createContext, useLayoutEffect, useState, ReactNode } from "react";

// Define the shape of the context
interface CryptoContextType {
  cryptoData: any; // Replace 'any' with the actual type if known
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  perPage: number;
  searchData: any; // Replace 'any' with the actual type if known
  getSearchResult: (query: string) => Promise<void>;
  setCoinSearch: React.Dispatch<React.SetStateAction<string>>;
  setSearchData: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the actual type if known
  resetFunction: () => void;
  cryptoId: any; // Replace 'any' with the actual type if known
}

// Create context object with a default value
export const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

// Define props for the CryptoProvider
interface CryptoProviderProps {
  children: ReactNode;
}

// CryptoProvider component
export const CryptoProvider: React.FC<CryptoProviderProps> = ({ children }) => {
  const [cryptoId, setCryptoId] = useState<any>(); // Replace 'any' with the actual type if known
  const [cryptoData, setCryptoData] = useState<any>(); // Replace 'any' with the actual type if known
  const [currency, setCurrency] = useState<string>("usd");
  const [sortBy, setSortBy] = useState<string>("market_cap_desc");
  const [page, setPage] = useState<number>(1);
  const [totalPages] = useState<number>(350);
  const [perPage, setPerPage] = useState<number>(8);
  const [searchData, setSearchData] = useState<any>(); // Replace 'any' with the actual type if known
  const [coinSearch, setCoinSearch] = useState<string>("");
  const [id, setCoinId] = useState<string>("");

  const getCryptoData = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&page=${page}&per_page=${perPage}`
      ).then((res) => res.json());
      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCryptoId = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${id}&order=market_cap_desc&page=1&per_page=200`
      ).then((res) => res.json());
      setCryptoId(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchResult = async (query: string) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      ).then((res) => res.json());
      setSearchData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  const resetFunction = () => {
    setPage(1);
    setCoinSearch("");
    setSortBy("market_cap_desc");
  };

  useLayoutEffect(() => {
    getCryptoData();
    getCryptoId();
  }, [currency, sortBy, page, perPage, coinSearch]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        setPerPage,
        perPage,
        searchData,
        getSearchResult,
        setCoinSearch,
        setSearchData,
        resetFunction,
        cryptoId,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
