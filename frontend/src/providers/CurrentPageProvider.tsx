import React from "react";

interface ICurrentPageProps {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

export const CurrentPageContext = React.createContext<ICurrentPageProps>({
  currentPage: 1,
  setCurrentPage: () => {},
});

interface ICurrentPageProviderProps {
  children: React.ReactNode;
}

export const CurrentPageProvider = ({
  children,
}: ICurrentPageProviderProps) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  );
};
