import axxios from '../axios/axiosInstance';
import { avatarURL } from '../utils/api-url';
import ProfileEditButton from './ProfileEditButton';
import React, { useEffect, useState } from 'react';

const ProfileAvatar = ({ children, className = "bg-indigo-600" }) => {
    return (
        <div className={["relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]", className].join(" ")}>
            {children}
        </div>
    );
};

export const ProfileOrInitial = ({ id, initial, avatar, className = "bg-indigo-600" }) => {
    const [base64, setBase64] = useState(null);
    // const [userData, setuserData] = useState(null);

    // useEffect(() => {
    //     axxios.get(`/profile/${id}`).then(res => {
    //         if (res.data) {
    //             setuserData(res.data);
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }, [id])

    return (
        <ProfileAvatar className={className}>
            {
                avatar || base64 ?
                    <img src={base64 || avatarURL(avatar)} alt={avatar} className='w-full h-full object-cover rounded-full' />
                    :
                    <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                        {initial}
                    </div>
            }
            <ProfileEditButton
                onClick={() => { }}
                setPreview={(file, base64) => {
                    setBase64(base64);

                    const formData = new FormData();
                    formData.append('avatar', file);

                    axxios.post(`/profile/avatar`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    });
                }}
            />
        </ProfileAvatar>
    );
};

export default ProfileAvatar;
