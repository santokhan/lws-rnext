import React, { Fragment, useEffect, useState } from 'react'
import axxios from '../axios/axiosInstance'
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { useAuth } from '../context/auth-context';

export const PopularBlogs = () => {
    const [popularBlogs, setpopularBlogs] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        axxios.get('/blogs/popular')
            .then(res => {
                const data = res.data;
                const blogs = data.blogs;
                try {
                    setpopularBlogs(blogs);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false); // Set loading to false after fetching data
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false); // Set loading to false in case of error
            });
    }, [setpopularBlogs]);

    if (loading) {
        return <p>Loading...</p>; // Render loading message while data is being fetched
    }

    if (!popularBlogs) {
        return null;
    }

    return (
        <div className="border border-white/10 rounded-lg p-4 hover:border-white/20">
            <SectionHeader>Most Popular 👍️</SectionHeader>

            <ul className="space-y-5 my-5">
                {
                    popularBlogs.map(({ id, author, likes, title }) => {
                        return (
                            <li key={id}>
                                <Link to={`/blog/${id}`}>
                                    <h3 className="text-slate-400 hover:text-slate-300 transition-all cursor-pointer">
                                        {title}
                                    </h3>
                                </Link>
                                <p className="text-slate-600 text-sm">by <a href="./profile.html">
                                    {author.firstName} {author.lastName}</a> <span>·</span> {likes.length} Likes
                                </p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export const FavoriteBlogs = () => {
    const [favoriteBlogs, setFavoriteBlogs] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state
    const { user } = useAuth();

    useEffect(() => {
        axxios.get('/blogs/favourites')
            .then(res => {
                const data = res.data;
                const blogs = data.blogs;
                try {
                    setFavoriteBlogs(blogs);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false); // Set loading to false after fetching data
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false); // Set loading to false in case of error
            });
    }, [setFavoriteBlogs]);

    if (loading) {
        return <p>Loading...</p>; // Render loading message while data is being fetched
    }

    if (!favoriteBlogs) {
        return null;
    }

    return (
        <div className="border border-white/10 rounded-lg p-4 hover:border-white/20">
            <SectionHeader>Your Favorites ❤️</SectionHeader>
            <div className="my-5 space-y-2">
                {
                    favoriteBlogs.map(({ id, tags, title }) => (
                        <div key={id}>
                            <Link to={`/blog/${id}`}>
                                <h3 className="text-slate-300 hover:text-slate-200 transition-all cursor-pointer">
                                    {title}
                                </h3>
                            </Link>
                            <ul className="flex gap-3 items-center justify-start space-y-1">
                                {
                                    tags && tags.split(",").map((tag, index) => (
                                        <Fragment key={index}>
                                            <span className='py-1 rounded text-slate-500 capitalize'>{tag}</span>
                                        </Fragment>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

const Sidebar = () => {
    return (
        <div className="flex-shrink-0 w-full max-w-md h-full space-y-5">
            <PopularBlogs />
            <FavoriteBlogs />
        </div>
    );
};

export default Sidebar;
