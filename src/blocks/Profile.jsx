import React from 'react';
import BlogCard from '../blocks/BlogCard';
import { ProfileOrInitial } from '../components/ProfileAvatar';
import ProfileBio from './ProfileBio';
import YourBlogs from '../components/TitleOnProfile';
import NameEmail from '../components/NameEmail';
import { useAuth } from '../context/auth-context';

const Profile = ({ data }) => {
    const { user } = useAuth();

    if (!data) return null;
    if (!user) return null;

    return (
        <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
                <div className="flex flex-col items-center py-8 text-center">
                    <ProfileOrInitial avatar={data.avatar} initial={data.firstName[0]} />
                    <NameEmail user={data} />
                    {data.bio && <ProfileBio initialBio={data.bio} editable={user.id === data.id} />}
                </div>

                {
                    data.favorite &&
                    <>
                        <YourBlogs />
                        <div className="my-6 space-y-4">
                            {
                                data.favorite.map((blog, i) =>
                                    <BlogCard key={i} {...blog} />
                                )
                            }
                        </div>
                    </>
                }
            </div>
        </main>
    );
};

export default Profile;
