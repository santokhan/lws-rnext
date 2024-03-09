import Sidebar from "../blocks/Sidebar";
import BlogContent from "../blocks/BlogContent";
import { BlogProvider } from "../context/blog-context";
import React from 'react';

const HomePage = () => {
    return (
        <BlogProvider>
            <div className="w-full flex flex-wrap xl:flex-nowrap gap-4">
                <BlogContent />
                <Sidebar />
            </div>
        </BlogProvider>
    );
};

export default HomePage;
