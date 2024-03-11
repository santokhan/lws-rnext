import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';
import BlogCard from '../blocks/BlogCard';
import { Edit } from 'iconsax-react';
import { ProfileOrInitial } from '../components/ProfileAvatar';
import YourBlogs from '../components/TitleOnProfile';
import NameEmail from '../components/NameEmail';
import ProfileBio from '../blocks/ProfileBio';
import axxios from '../axios/axiosInstance';

export const MyBlogs = ({ blogs }) => {
    return (
        blogs &&
        <>
            <YourBlogs />
            <div className="my-6 space-y-4">
                {
                    blogs.map((blog, i) =>
                        <BlogCard key={i} {...blog} />
                    )
                }
            </div>
        </>
    )
}

const ProfilePage = () => {
    const { user } = useAuth();
    const [userProfile, setuserProfile] = useState(null);

    useEffect(() => {
        if (user.id) {
            axxios.get(`/profile/${user.id}`).then(res => {
                if (res.data) {
                    setuserProfile(res.data);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }, [user, setuserProfile])

    const onEditBio = (bio) => {
        axxios.patch(`/profile`, { bio }).then((res) => {
            const data = res.data;
            if (data) {
                setuserProfile({ ...userProfile, bio: data.user.bio });
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    if (!user) return null;
    if (!userProfile) return null;

    return (
        <>
            <div className="flex flex-col items-center py-8 text-center">
                <ProfileOrInitial initial={user.firstName[0]} id={user.id} avatar={userProfile.avatar} />
                <NameEmail user={user} />
                <ProfileBio initialBio={userProfile.bio} onEditBio={onEditBio} editable={user.id === userProfile.id} />
            </div>
            <MyBlogs userId={user.id} blogs={userProfile.blogs} />
        </>
    );
};

export default ProfilePage;
