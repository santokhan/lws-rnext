import { Edit } from "iconsax-react";
import { useState } from "react";
import React from 'react';

const ProfileBio = ({ initialBio }) => {
    const [bio, setBio] = useState(initialBio);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Save the edited bio
        // For example, you can send a request to update the bio on the server
        console.log("Bio saved:", bio);
        setIsEditing(false);
    };

    return (
        <>
            <div className="mt-4 flex items-start gap-2 lg:mt-6">
                {isEditing ? (
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={10}
                        cols={100}
                        className="flex-1 bg-transparent focus:outline-none text-white resize-none border rounded-lg border-white/10 p-4"
                    />
                ) : (
                    <div className="flex-1">
                        <p className="leading-[188%] text-gray-400 lg:text-lg">{bio}</p>
                    </div>
                )}
                {/* Edit Bio button. The Above bio will be editable when clicking on the button */}
                {!isEditing && (
                    <button className="flex-center h-7 w-7 rounded-full" onClick={handleEditClick}>
                        <Edit className="w-4 h-4" />
                    </button>
                )}
            </div>
            {isEditing && (
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={handleSaveClick}>
                    Save
                </button>
            )}
        </>
    );
};

export default ProfileBio;
