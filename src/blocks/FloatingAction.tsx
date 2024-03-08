import { Heart, Like1, Message } from 'iconsax-react';
import React from 'react';
import axxios from '../axios/axiosInstance';
import { Blog } from '../schema/blogs';

const FloatingActions: React.FC<{ blog: Blog, reFetchBlog: () => void }> = ({ blog, reFetchBlog }) => {
    const { id, likes, comments, isFavorite } = blog;

    function toggleLike() {
        axxios.post(`/blogs/${id}/like`).then(res => {
            const data = res.data;
            if (data) {
                reFetchBlog();
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="w-48 fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 px-3 py-3 rounded-full">
            <ul className="flex items-center justify-evenly gap-4">
                <li className='flex items-center gap-1'>
                    <Like1 className="w-5 h-5" />
                    <span>{likes.length}</span>
                </li>
                <li className='flex items-center gap-1'>
                    <button
                        className={["hover:text-red-500", isFavorite ? "text-red-500" : ""].join(" ")}
                        onClick={toggleLike}
                    ><Heart className="w-5 h-5" /></button>
                </li>
                <a href="#comments">
                    <li className='flex items-center gap-1'>
                        <Message className="w-5 h-5" />
                        <span>{comments?.length}</span>
                    </li>
                </a>
            </ul>
        </div>
    );
};

export default FloatingActions;
