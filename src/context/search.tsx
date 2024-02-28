import { FC, ReactNode, createContext, useContext, useState } from 'react';

// Define the type for the Newsfeed data
type Category = string

// Define the type for the Newsfeed context
interface SearchContext {
    query: Category;
    changeQuery: (category: string) => void;
}

// Create the Newsfeed context
const SearchContext = createContext<SearchContext | undefined>(undefined);

// Custom hook to use the Newsfeed context
export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useNewsfeed must be used within a NewsfeedProvider');
    }
    return context;
};

// Newsfeed Provider component
export const SearchContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [query, setQuery] = useState<Category>('');

    // Function to add a news item to the feed
    const changeCategory = (query: string) => {
        setQuery(query);
    };

    return (
        <SearchContext.Provider value={{ query: query, changeQuery: changeCategory }}>
            {children}
        </SearchContext.Provider>
    );
};
