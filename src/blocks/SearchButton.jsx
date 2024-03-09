import React from 'react';
import { SearchNormal } from 'iconsax-react';
import SearchModal from './SearchModal';

const SearchButton = () => {
    const openDialog = () => {
        const dialog = document.getElementById('searchDialog');
        if (dialog) {
            dialog.showModal();
        }
    };

    const closeDialog = () => {
        const dialog = document.getElementById('searchDialog');
        if (dialog) {
            dialog.close();
        }
    };

    const handleOpenDialog = (event) => {
        event.preventDefault();
        openDialog();
    };

    const handleCloseDialog = () => {
        closeDialog();
    };

    return (
        <>
            <button
                className="flex items-center gap-2 cursor-pointer text-white/75 hover:text-white"
                onClick={handleOpenDialog}
            >
                <SearchNormal />
                Search
            </button>
            <dialog id="searchDialog" className="fixed inset-0 w-full h-screen z-1 bg-transparent backdrop:bg-inherit backdrop:backdrop-blur-sm">
                <SearchModal onClose={handleCloseDialog} />
            </dialog>
        </>
    );
};

export default SearchButton;
