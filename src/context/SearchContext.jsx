import { createContext, useContext, useState } from "react";

const searchContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const SearchContextProvider = ({ children }) => {
  const [tag, setTag] = useState("");
  // handle search
  const handleSearch = (value) => {
    setTag(value);
  };
  return (
    <searchContext.Provider
      value={{
        tag,
        handleSearch,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

const useSearchTag = () => {
  const searchContexttag = useContext(searchContext);
  if (!searchContexttag) throw new Error("Search context not found");
  return searchContexttag;
};

// eslint-disable-next-line react-refresh/only-export-components
export default useSearchTag;
