import React, { ReactNode } from 'react';

interface MainContainerProps {
    children: ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
    return <main className="my-10 lg:my-14">{children}</main>;
};

export default MainContainer;
