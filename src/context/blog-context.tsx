// BlogProvider.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode, FC, Context, useCallback } from 'react';
import { Blog, blogArray } from '../schema/blogs';
import axios from 'axios'; // Assuming axxios is a typo and you meant axios

interface BlogContextType {
    blogs: Blog[] | null;
    loading: boolean;
    reachedEnd: boolean;
    deleteBlog: (id: string) => void;
    pageIncrement: () => void;
}

export const BlogContext: Context<BlogContextType> = createContext<BlogContextType>({
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

export const BlogProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [blogs, setBlogs] = useState<Blog[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [reachedEnd, setReachedEnd] = useState<boolean>(false);

    const reFetchBlogs = (currentPage: number) => {
        setLoading(true);
        axios.get(`/blogs?page=${currentPage}&limit=${limitPerPage}`)
            .then(res => {
                const data = res.data;
                const fetchedBlogs = data.blogs;
                try {
                    const validated = blogArray.parse(fetchedBlogs);
                    if (validated) {
                        if (validated.length === 0) {
                            setReachedEnd(true);
                        } else {
                            setBlogs(prevBlogs => prevBlogs ? [...prevBlogs, ...validated] : validated);
                        }
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }

    const fetchBlogs = useCallback(() => {
        axios.get(`/blogs?page=1&limit=${limitPerPage}`)
            .then(res => {
                const data = res.data;
                const fetchedBlogs = data.blogs;
                try {
                    const validated = blogArray.parse(fetchedBlogs);
                    if (validated) {
                        if (validated.length === 0) {
                            setReachedEnd(true);
                        } else {
                            setBlogs(validated);
                        }
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    useEffect(fetchBlogs, [fetchBlogs]); // Run fetchBlogs only once when the component mounts

    return (
        <BlogContext.Provider value={{
            blogs,
            loading,
            reachedEnd,
            deleteBlog(id: string) {
                axios.delete(`/blogs/${id}`).then(res => {
                    const data = res.data;
                    if (data) {
                        fetchBlogs();
                        console.log(res);
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
