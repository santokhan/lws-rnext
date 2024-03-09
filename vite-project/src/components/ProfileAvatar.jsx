import { avatarURL } from '../utils/api-url';
import ProfileEditButton from './ProfileEditButton';
import React from 'react';

const ProfileAvatar = ({ children, className = "bg-indigo-600" }) => {
    return (
        <div className={["relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]", className].join(" ")}>
            {children}
        </div>
    );
};

export const ProfileOrInitial = ({ thumbnail, initial, className = "bg-indigo-600" }) => {
    return (
        <ProfileAvatar className={className}>
            {
                typeof thumbnail === "string" ?
                    <img src={avatarURL(thumbnail)} alt={thumbnail} className='object-cover rounded-full' />
                    :
                    <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                        {initial}
                    </div>
            }
            <ProfileEditButton onClick={() => { }} />
        </ProfileAvatar>
    );
};

export default ProfileAvatar;
