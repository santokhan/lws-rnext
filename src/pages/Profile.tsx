import React from 'react';
import { useAuth } from '../context/auth-context';
import BlogCard from '../blocks/BlogCard';
import { Edit } from 'iconsax-react';
import { ProfileOrInitial } from '../components/ProfileAvatar';
import YourBlogs from '../components/TitleOnProfile';
import NameEmail from '../components/NameEmail';
import ProfileBio from '../blocks/ProfileBio';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();

    console.log(user);

    return (
        user &&
        <>
            <div className="flex flex-col items-center py-8 text-center">
                {/* profile image */}
                <ProfileOrInitial thumbnail={user.avatar} initial={user.firstName[0]} />
                <NameEmail user={user} />
                {user.bio && <ProfileBio initialBio={user.bio} />}
                {
                    user.bio &&
                    <>
                        <div className="mt-4 flex items-start gap-2 lg:mt-6">
                            <div className="flex-1">
                                <p className="leading-[188%] text-gray-400 lg:text-lg">{user.bio}</p>
                            </div>
                            {/* Edit Bio button. The Above bio will be editable when clicking on the button */}
                            <button className="flex-center h-7 w-7 rounded-full">
                                <Edit className='w-4 h-4' />
                            </button>
                        </div>
                        <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8" />
                    </>
                }
            </div>
            {
                user.favorite &&
                <>
                    <YourBlogs />
                    <div className="my-6 space-y-4">
                        {
                            user.favorite.map((blog, i) =>
                                <BlogCard key={i} {...blog} />
                            )
                        }
                    </div>
                </>
            }
        </>
    );
};

export default ProfilePage;
