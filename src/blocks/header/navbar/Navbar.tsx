// Navbar.tsx
import logoSrc from '../../../assets/lws-logo-en.svg'

import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="py-6 md:py-8 fixed top-0 w-full !bg-[#191D26] z-50">
            <div className="container mx-auto flex items-center justify-between gap-x-6">
                {/* Logo */}
                <a href="/">
                    <img className="h-[45px]" src={logoSrc} alt="Lws" />
                </a>
                {/* Logo Ends */}
            </div>
        </nav>
    );
};

export default Navbar;
