import { Link } from 'react-router-dom';
import { thumbnailURL } from '../utils/api-url';
import { AvatarOrInitial } from '../components/UserAvator';
import { formatDate } from '../utils/date';
import Action from './Action';
import React, { useEffect, useState } from 'react';
import axxios from '../axios/axiosInstance';

const BlogCard = (props) => {
    const [userProfile, setuserProfile] = useState(null);

    useEffect(() => {
        if (props.author.id) {
            axxios.get(`/profile/${props.author.id}`).then(res => {
                if (res.data) {
                    setuserProfile(res.data);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }, [props])

    if (!props && !userProfile) { return null; }

    const { id, title, content, thumbnail, likes, author, createdAt, userId } = props;

    return (
        <div className="border border-white/10 rounded-lg p-3 hover:border-white/20 flex flex-wrap md:flex-nowrap gap-4">
            {
                typeof thumbnail === "string" &&
                <Link to={`/blog/${id}`} className="rounded-md flex-shrink-0 w-full md:w-80">
                    <img className="w-full aspect-video object-cover" src={thumbnailURL(thumbnail)} alt={thumbnail} />
                </Link>
            }
            <div className="flex-grow mt-2 relative flex flex-col justify-between">
                <div className="flex-1">
                    <Link to={`/blog/${id}`}>
                        <h3 className="text-slate-300 text-xl lg:text-2xl inline-flex">
                            {title}
                        </h3>
                    </Link>
                    <p className="mb-6 text-base text-slate-500 mt-1">
                        {content}
                    </p>
                </div>
                {/* Meta Informations */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center capitalize space-x-2">
                        <Link to={`/profile/${author.id}`}>
                            <AvatarOrInitial initial={author.firstName[0]} thumbnail={author.avatar} />
                        </Link>
                        <div>
                            <Link to={`/profile/${author.id}`}>
                                <h5 className="text-slate-500 text-sm">
                                    {author.firstName} {author.lastName}
                                </h5>
                            </Link>
                            <div className="flex items-center text-xs text-slate-700">
                                {formatDate(createdAt)}
                            </div>
                        </div>
                    </div>
                    <div className="text-sm px-2 py-1 text-slate-700">
                        {likes.length} Likes
                    </div>
                </div>
                {userId === author.id && <Action id={id} />}
            </div>
        </div>
    );
};

export default BlogCard;
