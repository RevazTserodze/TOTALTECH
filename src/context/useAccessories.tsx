import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Accessory {
  id: number;
  name: string;
  img: string;
  info: string;
  details: string;
  price: number;
  mm: number;
  mp: number;
  mic: boolean;
  aud: boolean;
}

interface CardObject {
  cards: Accessory[];
}

type AccessoriesType = Record<string, CardObject>;

interface AccessoriesContextType {
  accessories: AccessoriesType | undefined;
  isLoading: boolean;
  error: Error | null;
  filterAccessories: (filters: FilterCriteria) => Accessory[] | undefined;
}

interface FilterCriteria {
  mm?: number;
  mp?: number;
  mic?: boolean;
  aud?: boolean;
  price?: { from: number; to: number } | undefined;
  info?: string;
}

const AccessoriesContext = createContext<AccessoriesContextType | undefined>(undefined);

const fetchAccessories = async (): Promise<AccessoriesType> => {
  const response = await axios.get("/companyAccessories.json");
  return response.data;
};

export const AccessoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: accessories, isLoading, error } = useQuery<AccessoriesType, Error>({
    queryKey: ["accessories"],
    queryFn: fetchAccessories,
  });

  const filterAccessories = (filters: FilterCriteria): Accessory[] | undefined => {
    if (!accessories) return undefined;

    return Object.values(accessories).flatMap((cardObject) =>
      cardObject.cards.filter((item) => {
        const matchesCategory =
          (filters.mm === undefined || item.mm === filters.mm) &&
          (filters.mp === undefined || item.mp === filters.mp) &&
          (filters.mic === undefined || item.mic === filters.mic) &&
          (filters.aud === undefined || item.aud === filters.aud);

        const matchesPrice =
          !filters.price ||
          (item.price >= filters.price.from && item.price <= filters.price.to);

        const matchesSearch =
          !filters.info || item.name.toLowerCase().includes(filters.info.toLowerCase());

        return matchesCategory && matchesPrice && matchesSearch;
      })
    );
  };

  return (
    <AccessoriesContext.Provider value={{ accessories, isLoading, error, filterAccessories }}>
      {children}
    </AccessoriesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAccessories = (): AccessoriesContextType => {
  const context = useContext(AccessoriesContext);
  if (!context) {
    throw new Error("useAccessories must be used within an AccessoriesProvider");
  }
  return context;
};
