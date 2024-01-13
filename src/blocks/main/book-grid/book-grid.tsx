import React, { ReactNode } from 'react';

interface BookGridProps {
    children: ReactNode;
}

const BookGrid: React.FC<BookGridProps> = ({ children }) => {
    return (
        <div className="container px-4 mx-auto grid grid-cols-1 gap-8 max-w-7xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {children}
        </div>
    );
};

export default BookGrid;
