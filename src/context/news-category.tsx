import React, { createContext, useContext, useState } from 'react';

// Define the type for the Newsfeed data
type Category = string

// Define the type for the Newsfeed context
interface NewsCategoryContext {
    category: Category;
    changeCategory: (category: string) => void;
}

// Create the Newsfeed context
const NewsfeedContext = createContext<NewsCategoryContext | undefined>(undefined);

// Custom hook to use the Newsfeed context
export const useNewsCategory = () => {
    const context = useContext(NewsfeedContext);
    if (!context) {
        throw new Error('useNewsfeed must be used within a NewsfeedProvider');
    }
    return context;
};

// Newsfeed Provider component
export const NewsCategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [category, setcategory] = useState<Category>('');

    // Function to add a news item to the feed
    const changeCategory = (category: string) => {
        setcategory(category);
    };

    return (
        <NewsfeedContext.Provider value={{ category, changeCategory }}>
            {children}
        </NewsfeedContext.Provider>
    );
};
