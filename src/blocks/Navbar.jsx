import React from 'react';
import lwsLogoEn from '../assets/lws-logo-en.svg';

const Navbar = () => {
    return (
        // Navbar Starts
        <nav className="py-6">
            <div className="container mx-auto flex items-center justify-between gap-x-6">
                {/* Logo */}
                <a href="/">
                    <img
                        className="h-[40px]"
                        src={lwsLogoEn}
                        alt="Lws"
                    />
                </a>
                {/* Logo Ends */}
                <a
                    className="px-5 py-2 bg-[#172227] rounded-[44px]"
                    href="#"
                >
                    Get Admission
                </a>
            </div>
        </nav>
        // Navbar Ends
    );
};

export default Navbar;
