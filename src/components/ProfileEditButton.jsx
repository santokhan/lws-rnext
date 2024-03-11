import { Edit } from "iconsax-react";
import React, { useEffect, useState } from 'react';

const ProfileEditButton = ({ onClick, setPreview }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        // Access the selected file from the event
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    useEffect(() => {
        if (selectedFile) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                // Set the preview URL
                setPreview(selectedFile, fileReader.result);
            };
            fileReader.readAsDataURL(selectedFile);
        }
    }, [selectedFile, setPreview]); // Pass setPreview as dependency

    return (
        <button
            className="grid place-items-center absolute bottom-0 right-0 h-8 w-8 rounded-full bg-slate-700 hover:bg-slate-700/80"
            onClick={onClick} // Pass onClick event handler
        >
            <input
                type="file"
                id="profile"
                accept="image/png, image/jpeg, image/jpg" // Restricting to PNG, JPG, and JPEG files
                onChange={handleFileChange}
                className="w-full h-full opacity-0 absolute left-0 top-0"
            />
            <Edit className='w-4 h-4' />
        </button>
    );
};

export default ProfileEditButton;
