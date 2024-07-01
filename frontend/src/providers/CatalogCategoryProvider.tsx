import React from "react";

interface ICatalogCategoryProps {
  catalogCategoryTypeName: string;
  setCatalogCategoryTypeName: (catalogCategoryTypeName: string) => void;
  catalogCategoryTypeUrl: string;
  setCatalogCategoryTypeUrl: (catalogCategoryTypeUrl: string) => void;
}

export const CatalogCategoryContext =
  React.createContext<ICatalogCategoryProps>({
    catalogCategoryTypeName: "",
    setCatalogCategoryTypeName: () => {},
    catalogCategoryTypeUrl: "",
    setCatalogCategoryTypeUrl: () => {},
  });

interface ICatalogCategoryProviderProps {
  children: React.ReactNode;
}

export const CatalogCategoryProvider = ({
  children,
}: ICatalogCategoryProviderProps) => {
  const [catalogCategoryTypeName, setCatalogCategoryTypeName] =
    React.useState("");

  const [catalogCategoryTypeUrl, setCatalogCategoryTypeUrl] =
    React.useState("");

  return (
    <CatalogCategoryContext.Provider
      value={{
        catalogCategoryTypeName,
        setCatalogCategoryTypeName,
        catalogCategoryTypeUrl,
        setCatalogCategoryTypeUrl,
      }}
    >
      {children}
    </CatalogCategoryContext.Provider>
  );
};
