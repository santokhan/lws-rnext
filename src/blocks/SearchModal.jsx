import { CloseCircle } from 'iconsax-react';
import React, { Fragment, useState } from 'react';
import axxios from '../axios/axiosInstance';
import { Link } from 'react-router-dom';
import { srcURL } from '../utils/api-url';
import truncateText from '../utils/truncate';
import debounce from '../utils/debounce';

const SearchResultCard = ({ blog }) => {
    if (!blog) { return null; }

    const { id, title, content, thumbnail } = blog;
    const to = `/blog/${id}`;

    return (
        <div className="flex gap-6 py-2">
            <Link to={to}>
                <img className="h-28 w-48 object-contain flex-shrink-0 rounded" src={srcURL("/uploads/blog/", thumbnail)} alt={thumbnail} />
            </Link>
            <div className="mt-2 flex-grow">
                <Link to={to} className='inline-flex'>
                    <h3 className="text-slate-300 text-xl font-bold">
                        {title}
                    </h3>
                </Link>
                {/* Meta Informations */}
                <p className="mb-6 text-sm text-slate-500 mt-1">
                    {truncateText(content, 140)}
                </p>
            </div>
        </div>
    )
}

const SearchModal = ({ onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBlogs, setFilteredResults] = useState([]);

    // Debounce the search query
    const debouncedSearch = debounce((query) => {
        // Perform search logic here
        axxios.get(`/search?q=${query}`).then((res) => {
            const data = res.data;
            const results = data.data;
            setFilteredResults(results);
        })
    }, 500); // Adjust the debounce delay as per your requirement

    // Function to handle search query change
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        // Trigger debounce function with the search query
        debouncedSearch(query);
    };

    return (
        <section className="w-full h-full grid place-items-center text-white">
            <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
                {/* Search */}
                <div>
                    <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">Search for Your Desire Blogs</h3>
                    <input
                        type="text"
                        placeholder="Start Typing to Search"
                        className="w-full bg-white/5 p-2 text-base text-white outline-none border border-white/20 rounded-lg"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                {/* Search Result */}
                {
                    filteredBlogs.length > 0 &&
                    <div className="">
                        <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
                        <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
                            {filteredBlogs.map((blog, i) =>
                                <Fragment key={i}>
                                    <SearchResultCard key={i} blog={blog} />
                                </Fragment>
                            )}
                        </div>
                    </div>
                }
                <button className="absolute right-2 top-2 cursor-pointer w-8 h-8 text-white" onClick={onClose}>
                    <CloseCircle className='w-7 h-7' />
                </button>
            </div>
        </section>
    );
};

export default SearchModal;

