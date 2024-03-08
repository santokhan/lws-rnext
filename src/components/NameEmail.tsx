import React from 'react';

interface User {
    firstName: string;
    lastName: string;
    email?: string;
}

interface Props {
    user: User;
}

const NameEmail: React.FC<Props> = ({ user }) => {
    return (
        <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
                {user.firstName} {user.lastName}
            </h3>
            {user.email && <p className="leading-[231%] lg:text-lg">{user.email}</p>}
        </div>
    );
};

export default NameEmail;
