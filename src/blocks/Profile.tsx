import React from 'react';
import BlogCard from '../blocks/BlogCard';
import { User } from '../schema/user';
import { ProfileOrInitial } from '../components/ProfileAvatar';
import ProfileBio from './ProfileBio';
import YourBlogs from '../components/TitleOnProfile';
import NameEmail from '../components/NameEmail';

const Profile: React.FC<{ data: User }> = ({ data }) => {
    if (!data) { return null; }

    return (
        <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
                {/* profile info */}
                <div className="flex flex-col items-center py-8 text-center">
                    {/* profile image */}
                    <ProfileOrInitial thumbnail={data.avatar} initial={data.firstName[0]} />
                    <NameEmail user={data} />
                    {data.bio && <ProfileBio initialBio={data.bio} />}
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
