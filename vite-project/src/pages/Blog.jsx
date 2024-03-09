import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axxios from '../axios/axiosInstance';
import { thumbnailURL } from '../utils/api-url';
import { AvatarOrInitial } from '../components/UserAvator';
import { formatDate } from '../utils/date';
import Comments from '../blocks/Comment';
import FloatingActions from '../blocks/FloatingAction';

const BlogPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchBlog = useCallback(() => {
        axxios.get(`/blogs/${id}`).then(res => {
            const data = res.data;
            setBlog(data);
            setLoading(false);
        }).catch(err => {
            console.error(err);
        });
    }, [id]);

    useEffect(() => {
        fetchBlog();
    }, [fetchBlog]);

    if (loading) { return "Loading..."; }

    if (!blog) { return "Blog not found"; }

    const { tags, thumbnail, likes, author, title, createdAt, content } = blog;

    return (
        <main>
            {/* Begin Blogs */}
            <section>
                <div className="container text-center py-8">
                    <h1 className="font-bold text-3xl md:text-5xl">{title}</h1>
                    <div className="flex justify-center items-center my-4 gap-4">
                        <Link to={`/profile/${author.id}`} className="flex items-center capitalize space-x-2">
                            <AvatarOrInitial
                                thumbnail={author.avatar}
                                initial={author.firstName[0]}
                            />
                            <h5 className="text-slate-500 text-sm">{author.firstName} {author.lastName}</h5>
                        </Link>
                        {createdAt && <span className="text-sm text-slate-700">{formatDate(createdAt)}</span>}
                        {likes && <span className="text-sm text-slate-700">{likes.length} Likes</span>}
                    </div>
                    {
                        typeof thumbnail === "string" &&
                        <img className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96" src={thumbnailURL(thumbnail)} alt={thumbnail} />
                    }
                    {/* Tags */}
                    <ul className="flex gap-3 items-center justify-center my-4">
                        {
                            tags && tags.split(",").map((tag, index) => (
                                <li key={index} className='px-3 py-2 rounded bg-slate-800 font-medium capitalize'>{tag}</li>
                            ))
                        }
                    </ul>
                    {/* Content */}
                    <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
                        {content}
                    </div>
                </div>
            </section>
            {/* End Blogs */}

            {/* Begin Comments */}
            <Comments blog={blog} reFetchBlog={fetchBlog} />
            <FloatingActions blog={blog} reFetchBlog={fetchBlog} />
        </main>
    );
};

export default BlogPage;
