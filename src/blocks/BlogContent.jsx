import React from 'react';
import BlogCard from './BlogCard';
import { useBlogContext } from '../context/blog-context';
import IntersectionObserverComponent from '../components/IntersectionObserver';

const BlogEndMessage = () => (
    <div className="text-center py-4 text-gray-500">
        End of blog posts
    </div>
);

const BlogContent = () => {
    const { pageIncrement, reachedEnd, blogs } = useBlogContext();

    const handleIntersection = (entry) => {
        pageIncrement();
    };

    return (
        <div className="flex-grow space-y-4">
            {blogs && blogs.map((blog, i) => (
                <BlogCard key={i} {...blog} />
            ))}
            {reachedEnd && <BlogEndMessage />}
            <IntersectionObserverComponent onIntersection={handleIntersection} />
        </div>
    );
};

export default BlogContent;
