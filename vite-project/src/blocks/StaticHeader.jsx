import React from 'react'
import Logo from '../assets/logo.svg'
import { SearchNormal } from 'iconsax-react';
import Container from '../components/Container';
import { Link } from 'react-router-dom';

const StaticHeader = () => {
    return (
        <header>
            <Container>
                <nav className="flex justify-between items-center py-6">
                    {/* Logo */}
                    <div>
                        <Link to="/">
                            <img className="w-32" src={Logo} alt="lws" />
                        </Link>
                    </div>
                    <div>
                        <ul className="flex items-center space-x-5">
                            <li>
                                <Link to="search" className="flex items-center gap-2 cursor-pointer text-white/75 hover:text-white">
                                    <SearchNormal />Search
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </Container>
        </header>
    );
};

export default StaticHeader;
