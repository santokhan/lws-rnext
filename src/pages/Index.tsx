import { FC } from "react";
import Sidebar from "../blocks/Sidebar";
import BlogContent from "../blocks/BlogContent";
import { BlogProvider } from "../context/blog-context";

const HomePage: FC = () => {
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
