import { useToggle } from "@mantine/hooks";
import { createContext, useContext, useState } from "react";
import { ContextType } from "~/types/context";

const FilterContext = createContext<ContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [search, setSearch] = useState<string>("");
  const [filSem, setFilSem] = useState<string | null>(null);
  const [filSKS, setFilSKS] = useState<string | null>(null);
  const [filDay, setFilDay] = useState<string | null>(null);
  const [filHour, setFilHour] = useState<string | null>(null);
  const [upup, toggleupup] = useToggle();

  return (
    <FilterContext.Provider
      value={{
        search,
        setSearch,
        filSem,
        setFilSem,
        filSKS,
        setFilSKS,
        filDay,
        setFilDay,
        filHour,
        setFilHour,
        upup,
        toggleupup,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
