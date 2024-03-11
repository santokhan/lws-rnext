import React, { useEffect, useState } from 'react'
import Logo from '../assets/logo.svg'
import Container from '../components/Container';
import { Link, redirect, useLocation } from 'react-router-dom';
import { AvatarOrInitial } from '../components/UserAvator';
import { useAuth } from '../context/auth-context';
import SearchButton from './SearchButton';
import axxios from '../axios/axiosInstance';

const Navs = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const [userProfile, setuserProfile] = useState(null);

    useEffect(() => {
        if (user) {
            axxios.get(`/profile/${user.id}`).then(res => {
                if (res.data) {
                    setuserProfile(res.data);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }, [user])

    function handleLogout() {
        logout();
        redirect("/login");
    }

    return (
        <ul className="flex items-center space-x-5">
            {
                isAuthenticated &&
                <li>
                    <Link to="create-blog" className="bg-indigo-600 text-white/75 hover:text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                        Write
                    </Link>
                </li>
            }
            {
                location.pathname == '/' &&
                <li>
                    <SearchButton />
                </li>
            }
            {
                isAuthenticated &&
                <>
                    <li>
                        <button onClick={handleLogout} className="text-white/75 hover:text-white transition-all duration-200">
                            Logout
                        </button>
                    </li>
                    <li className="flex items-center">
                        {
                            user && userProfile &&
                            <>
                                <Link to="profile" className='flex items-center gap-2'>
                                    <AvatarOrInitial thumbnail={userProfile.avatar} initial={user.firstName[0]} className='bg-orange-600' />
                                    <span className="text-white/75 hover:text-white ml-2">
                                        {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email}
                                    </span>
                                </Link>
                            </>
                        }
                    </li>
                </>
            }
        </ul>
    )
}

const Header = () => {
    return (
        <header>
            <Container>
                <nav className="flex justify-between items-center py-6">
                    <div>
                        <Link to="/">
                            <img className="w-32" src={Logo} alt="lws" />
                        </Link>
                    </div>
                    <div>
                        <Navs />
                    </div>
                </nav>
            </Container>
        </header>

    );
};

export default Header;
