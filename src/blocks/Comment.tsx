import React from 'react';
import Avatar from '../components/UserAvator';
import { CommentType } from '../schema/comment';

interface CommentsProps {
    comments: CommentType[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
    if (!comments) { return null; }

    return (
        <section id="comments">
            <div className="mx-auto md:w-10/12 container">
                <h2 className="text-3xl font-bold my-8">Comments ({comments.length})</h2>
                <div className="flex items-center gap-4">
                    <Avatar>
                        <span className="">S</span>
                    </Avatar>
                    <div className="flex-grow">
                        <textarea className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none" placeholder="Write a comment" defaultValue={""} />
                        <div className="flex justify-end mt-4">
                            <button className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                                Comment
                            </button>
                        </div>
                    </div>
                </div>
                {comments.map((comment, index) => (
                    <div key={index} className="flex items-start gap-4 my-8">
                        <Avatar className='bg-orange-600'>
                            <span className="">S</span>
                        </Avatar>
                        {
                            comment &&
                            <div className="flex-grow">
                                <h5 className="text-slate -500 font-bold">{comment.author.firstName}</h5>
                                <p className="text-slate-300">{comment.content}</p>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Comments;
