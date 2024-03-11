import React, { useEffect, useState } from 'react';
import Avatar, { AvatarOrInitial } from '../components/UserAvator';
import axxios from '../axios/axiosInstance';
import { Trash } from 'iconsax-react';

const Comments = ({ blog, reFetchBlog }) => {
    const [comment, setComment] = useState("");

    if (!blog) {
        return null;
    } else {
        const { id, comments } = blog;

        function handleSubmit(e) {
            e.preventDefault();
            if (comment && id) {
                axxios.post(`/blogs/${blog.id}/comment`, { content: comment }).then(res => {
                    const data = res.data;
                    if (data) {
                        reFetchBlog();
                    }
                }).catch(err => {
                    console.log(err);
                })
            } else {
                console.log({ comment, id });
            }
        }

        function handleDelete(commentId) {
            axxios.delete(`/blogs/${id}/comment/${commentId}`).then(res => {
                const data = res.data;
                if (data) {
                    reFetchBlog();
                }
            }).catch(err => {
                console.log(err);
            })
        }

        return (
            <section id="comments">
                <div className="mx-auto md:w-10/12 container">
                    <h2 className="text-3xl font-bold my-8">Comments ({comments?.length || 0})</h2>
                    <div className="flex items-start gap-4">
                        <AvatarOrInitial initial={blog.author.firstName[0]} id={blog.author.id} thumbnail={blog.author.avatar} />
                        <form onSubmit={handleSubmit}
                            className="flex-grow">
                            <textarea required onChange={(e) => { setComment(e.target.value) }} className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none" placeholder="Write a comment" defaultValue={""} />
                            <div className="flex justify-end mt-4">
                                <button className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                                    Comment
                                </button>
                            </div>
                        </form>
                    </div>
                    {comments && comments.map((comment, index) => {
                        return (
                            comment &&
                            <div key={index} className="flex items-start gap-4 my-8">
                                <Avatar className='bg-orange-600'>
                                    <span className="">{blog.author.firstName[0]}</span>
                                </Avatar>
                                <div className="flex-grow">
                                    <h5 className="text-slate -500 font-bold">{comment.author.firstName} {comment.author.lastName}</h5>
                                    <p className="text-slate-300">{comment.content}</p>
                                </div>
                                <div className="w-10 h-10 flex justify-center items-center">
                                    <button type="button" onClick={() => { handleDelete(comment.id) }}>
                                        <Trash className='w-5 h-5 text-white hover:text-red-500' />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        );
    }
};

export default Comments;
