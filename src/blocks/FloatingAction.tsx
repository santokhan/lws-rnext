import { Heart, Like1, Message } from 'iconsax-react';
import React from 'react';
import axxios from '../axios/axiosInstance';
import { Blog } from '../schema/blogs';
import { useAuth } from '../context/auth-context';

const FloatingActions: React.FC<{ blog: Blog, reFetchBlog: () => void }> = ({ blog, reFetchBlog }) => {
    const { user } = useAuth();

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

    function toggleFavorite() {
        axxios.patch(`/blogs/${id}/favourite`).then(res => {
            const data = res.data;
            if (data) {
                console.log(data);
                reFetchBlog();
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const { id, likes, comments, isFavourite } = blog;

    const doesUserLike = likes?.some(like => like.id === user?.id)

    return (
        <div className="w-48 fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 px-3 py-3 rounded-full">
            <ul className="flex items-center justify-evenly gap-4">
                <li className='flex items-center gap-1'>
                    <button type="button"
                        onClick={toggleLike}
                        className={["hover:text-green-500", doesUserLike ? "text-green-500" : ""].join(" ")}
                    ><Like1 className="w-5 h-5" /></button>
                    <span>{likes?.length || 0}</span>
                </li>
                <li className='flex items-center gap-1'>
                    <button
                        onClick={toggleFavorite}
                        className={["hover:text-red-500", isFavourite ? "text-red-500" : ""].join(" ")}
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
