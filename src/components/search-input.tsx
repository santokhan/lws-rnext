import { SearchNormal1 } from 'iconsax-react';
import React, { useState } from 'react';
import { useSearchContext } from '../context/search';

interface SearchProps {
    placeholder: string;
}

// Define debounce function outside handleSubmit
function debounce<T extends (...args: unknown[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const SearchComponent: React.FC<SearchProps> = ({ placeholder }) => {
    const [value, setValue] = useState('');
    const [isOpen, setisOpen] = useState(false);
    const { changeQuery } = useSearchContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const debouncedSearch = debounce(() => {
            changeQuery(value);
        }, 1500);

        debouncedSearch();
    }

    return (
        isOpen ?
            <form className="flex items-center border rounded-full overflow-hidden" onSubmit={handleSubmit}>
                <input
                    type="search"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="focus:border-blue-500 outline-none py-2 px-4 block w-full appearance-none leading-normal"
                />
                <button className='rounded-full h-10 aspect-square hover:bg-gray-100 grid place-items-center'>
                    <SearchNormal1 className='w-4 h-4' />
                </button>
            </form>
            :
            <button type="button" className='rounded-full w-8 h-8 hover:bg-gray-100 grid place-items-center' onClick={() => {
                setisOpen(!isOpen)
            }}><SearchNormal1 className='w-4 h-4' /></button>
    );
};

export default SearchComponent;
