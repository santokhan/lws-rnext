import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axxios from '../axios/axiosInstance';
import { Blog, blogSchema } from '../schema/blogs';
import { thumbnailURL } from '../utils/api-url';
import { AvatarOrInitial } from '../components/UserAvator';
import { formatDate } from '../utils/date';
import Comments from '../blocks/Comment';
import FloatingActions from '../blocks/FloatingAction';

const BlogPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setloading] = useState<boolean>(true);

    const fetchBlog = useCallback(() => {
        axxios.get(`/blogs/${id}`).then(res => {
            const data = res.data;
            const parsed = blogSchema.parse(data);
            if (parsed) {
                setBlog(parsed);
            }
            setloading(false);
        }).catch(err => {
            console.log(err)
        })
    }, [id])

    useEffect(() => {
        fetchBlog();
    }, [fetchBlog])

    if (loading) { return "Loading..."; }

    return (
        blog &&
        <>
            <main>
                {/* Begin Blogs */}
                <section>
                    <div className="container text-center py-8">
                        <h1 className="font-bold text-3xl md:text-5xl">{blog.title}</h1>
                        <div className="flex justify-center items-center my-4 gap-4">
                            <Link to={`/profile/${blog.author.id}`} className="flex items-center capitalize space-x-2">
                                <AvatarOrInitial
                                    thumbnail={blog.author.avatar}
                                    initial={blog.author.firstName[0]}
                                />
                                <h5 className="text-slate-500 text-sm">{blog.author.firstName} {blog.author.lastName}</h5>
                            </Link>
                            <span className="text-sm text-slate-700">{formatDate(blog.createdAt)}</span>
                            <span className="text-sm text-slate-700">{blog.likes.length} Likes</span>
                        </div>
                        {
                            typeof blog.thumbnail === "string" &&
                            <img className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96" src={thumbnailURL(blog.thumbnail)} alt={blog.thumbnail} />
                        }
                        {/* Tags */}
                        <ul className="flex gap-3 items-center justify-center my-4">
                            {
                                blog.tags && blog.tags.split(",").map((tag, index) => (
                                    <li key={index} className='px-3 py-2 rounded bg-slate-800 font-medium capitalize'>{tag}</li>
                                ))
                            }
                        </ul>
                        {/* Content */}
                        <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
                            {blog.content}
                        </div>
                    </div>
                </section>
                {/* End Blogs */}

                {/* Begin Comments */}
                <Comments blog={blog} reFetchBlog={fetchBlog} />
            </main>
            <FloatingActions blog={blog} reFetchBlog={fetchBlog} />
        </>
    );
};

export default BlogPage;
