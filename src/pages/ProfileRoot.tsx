import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const ProfileRoot: FC = () => {
    return (
        <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
                <Outlet />
            </div>
        </main>
    );
};

export default ProfileRoot;
