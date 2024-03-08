import React from 'react'
import Logo from '../assets/logo.svg'
import Container from '../components/Container';
import { Link, redirect, useLocation } from 'react-router-dom';
import { AvatarOrInitial } from '../components/UserAvator';
import { useAuth } from '../context/auth-context';
import SearchButton from './SearchButton';

const Navs = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();

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
                            user &&
                            <>
                                <AvatarOrInitial thumbnail={user.avatar} initial={user.firstName[0]} className='bg-orange-600' />
                                <Link to="profile">
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

const Header: React.FC = () => {
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
