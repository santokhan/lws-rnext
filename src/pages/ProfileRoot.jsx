import { Outlet } from 'react-router-dom';
import React from 'react';

const ProfileRoot = () => {
    return (
        <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
                <Outlet />
            </div>
        </main>
    );
};

export default ProfileRoot;
