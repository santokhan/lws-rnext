import { useEffect, useRef, useState } from "react";
import { useBlogContext } from "../context/blog-context";
import { Edit, More, Trash } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import React from 'react';

const Action = ({ id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wraperRef = useRef(null);
    const { deleteBlog } = useBlogContext();
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState);
    };

    useEffect(() => {
        window.addEventListener('click', (e) => {
            if (wraperRef.current && !wraperRef.current.contains(e.target)) {
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }
        })
        return () => {
        }
    }, [wraperRef])

    return (
        <div className="absolute right-0 top-0" ref={wraperRef}>
            <button onClick={toggleDropdown}>
                <More className='w-5 h-5 rotate-90' />
            </button>
            {isOpen && (
                <div className="absolute right-0 top-0 flex flex-col w-48 bg-[#1e293b] backdrop-blur-md rounded-lg py-1 border border-white/5">
                    <button
                        onClick={() => {
                            navigate(`/update-blog/${id}`)
                        }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-white/5">
                        <Edit className='w-4 h-4' /> Edit
                    </button>
                    <button
                        onClick={() => { deleteBlog(id) }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-white/5">
                        <Trash className='w-4 h-4' /> Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default Action;