import React, { Fragment, useEffect, useState } from 'react'
import axxios from '../axios/axiosInstance'
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import Loading from '../components/Loading'

export const PopularBlogs = () => {
    const [popularBlogs, setpopularBlogs] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <Loading />;

    return (
        popularBlogs &&
        <div className="border border-white/10 rounded-lg p-4 hover:border-white/20">
            <SectionHeader>Most Popular 👍️</SectionHeader>
            <ul className="space-y-5 my-5">
                {
                    popularBlogs.map(({ id, author, likes, title }) => (
                        <li key={id}>
                            <Link to={`/blog/${id}`}>
                                <h3 className="text-slate-400 hover:text-slate-300 transition-all cursor-pointer">
                                    {title}
                                </h3>
                            </Link>
                            <p className="text-slate-600 text-sm">by <Link to={`/profile/${author.id}`}>
                                {author.firstName} {author.lastName}</Link> <span>·</span> {likes.length} Likes
                            </p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export const FavBlogs = ({ id }) => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        setLoading(true);
        axxios.get(`/blogs/${id}`)
            .then(res => {
                const data = res.data;
                setBlog(data)
            })
            .catch(err => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Loading />;
    if (!blog) return null;

    const { title, author, likes } = blog;

    return (
        <li>
            <Link to={`/blog/${id}`}>
                <h3 className="text-slate-400 hover:text-slate-300 transition-all cursor-pointer">
                    {title}
                </h3>
            </Link>
            <p className="text-slate-600 text-sm">by <Link to={`/profile/${author.id}`}>
                {author.firstName} {author.lastName}</Link> <span>·</span> {likes.length} Likes
            </p>
        </li>
    )
}

export const FavoriteBlogs = () => {
    const [favoriteBlogs, setFavoriteBlogs] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        axxios.get('/blogs/favourites')
            .then(res => {
                const blogs = res.data.blogs;
                if (blogs) {
                    setFavoriteBlogs(blogs);
                }
            })
            .catch(err => { console.log(err); })
            .finally(() => { setLoading(false); });
    }, [setFavoriteBlogs]);

    if (loading) return <Loading />;

    return (
        favoriteBlogs.length > 0 &&
        <div className="border border-white/10 rounded-lg p-4 hover:border-white/20">
            <SectionHeader>Your Favorites ❤️</SectionHeader>
            <ul className="my-5 space-y-5">
                {
                    favoriteBlogs.map(({ id, tags, title }) => (
                        <Fragment key={id}>
                            <FavBlogs id={id} tags={tags} title={title} />
                        </Fragment>
                    ))
                }
            </ul>
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
