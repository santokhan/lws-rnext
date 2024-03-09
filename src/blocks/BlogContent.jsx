import React from 'react';
import BlogCard from './BlogCard';
import { useBlogContext } from '../context/blog-context';
import { Fragment, useEffect, useRef, useState } from 'react';

const BlogEndMessage = () => (
    <div className="text-center py-4 text-gray-500">
        End of blog posts
    </div>
);

const BlogContent = () => {
    const { pageIncrement, reachedEnd, blogs } = useBlogContext();
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

        if (reachedEnd) {
            observer.unobserve(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.disconnect()
            }
        };
    }, [reachedEnd]);

    useEffect(() => {
        if (isInterSecting) {
            pageIncrement();
        }
    }, [isInterSecting, pageIncrement]);

    return (
        <div className="flex-grow space-y-4">
            {blogs && blogs.map((blog, i) => (
                <BlogCard key={i} {...blog} />
            ))}
            {reachedEnd && <BlogEndMessage />}
            <div ref={observerRef}></div>
        </div>
    );
};

export default BlogContent;
