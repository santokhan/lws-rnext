import React from 'react';
import BlogCard from './BlogCard';
import { useBlogContext } from '../context/blog-context';
import { Fragment, useEffect, useRef, useState } from 'react';

const BlogEndMessage = () => (
    <div className="text-center py-4 text-gray-500">
        End of blog posts
    </div>
);

const Blogs = () => {
    const { blogs, loading } = useBlogContext();

    if (loading) {
        return "Loading...";
    }

    return (
        <Fragment>
            {blogs && blogs.map((blog, i) => (
                <BlogCard key={i} {...blog} />
            ))}
        </Fragment>
    );
}

const BlogContent = () => {
    const { pageIncrement, reachedEnd } = useBlogContext();
    const observerRef = useRef(null);
    const [isInterSecting, setisInterSecting] = useState(false);

    useEffect(() => {
        const currentTarget = observerRef.current;

        const observer = new IntersectionObserver(([entry]) => {
            setisInterSecting(entry.isIntersecting);
        });

        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.disconnect()
            }
        };
    }, []);

    useEffect(() => {
        if (isInterSecting && !reachedEnd) {
            pageIncrement();
        }
    }, [isInterSecting, pageIncrement, reachedEnd]);

    return (
        <div className="flex-grow space-y-4">
            <Blogs />
            {reachedEnd && <BlogEndMessage />}
            <div ref={observerRef}></div>
        </div>
    );
};

export default BlogContent;
