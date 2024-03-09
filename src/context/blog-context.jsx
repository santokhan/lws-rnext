import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axxios from '../axios/axiosInstance';

export const BlogContext = createContext({
    blogs: null,
    loading: true,
    reachedEnd: false,
    deleteBlog: () => { },
    pageIncrement: () => { }
});

export const useBlogContext = () => {
    const context = useContext(BlogContext)
    if (!context) {
        throw new Error("useBlogContext must be used within a BlogProvider");
    }
    return context;
};

const limitPerPage = 10;

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [reachedEnd, setReachedEnd] = useState(false);

    const reFetchBlogs = (currentPage) => {
        setLoading(true);
        axxios.get(`/blogs?page=${currentPage}&limit=${limitPerPage}`)
            .then(res => {
                console.log(res);
                const data = res.data;
                const fetchedBlogs = data.blogs;
                if (fetchedBlogs) {
                    if (fetchedBlogs.length === 0) {
                        setReachedEnd(true);
                    } else {
                        setBlogs(prevBlogs => prevBlogs ? [...prevBlogs, ...fetchedBlogs] : fetchedBlogs);
                    }

                }
            })
            .catch(err => { console.log(err); })
            .finally(() => { setLoading(false); })
    }

    const fetchBlogs = useCallback(() => {
        axxios.get(`/blogs?page=1&limit=${limitPerPage}`)
            .then(res => {
                console.log(res);
                const data = res.data;
                const fetchedBlogs = data.blogs;
                if (fetchedBlogs) {
                    if (fetchedBlogs.length === 0) {
                        setReachedEnd(true);
                    } else {
                        setBlogs(fetchedBlogs);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            })
    }, []);

    useEffect(fetchBlogs, [fetchBlogs]);

    return (
        <BlogContext.Provider value={{
            blogs,
            loading,
            reachedEnd,
            deleteBlog(id) {
                axxios.delete(`/blogs/${id}`).then(res => {
                    const data = res.data;
                    if (data) {
                        fetchBlogs();
                    }
                });
            },
            pageIncrement() {
                if (reachedEnd) { return; }

                const currentPage = page + 1
                setPage(currentPage);
                reFetchBlogs(currentPage);
            }
        }}>
            {children}
        </BlogContext.Provider>
    );
};
