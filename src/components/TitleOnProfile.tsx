import React from 'react';

interface Props {
    className?: string;
}

const YourBlogs: React.FC<Props> = ({ className }) => {
    return (
        <h4 className={`mt-6 text-xl lg:mt-8 lg:text-2xl ${className}`}>
            Your Blogs
        </h4>
    );
};

export default YourBlogs;
