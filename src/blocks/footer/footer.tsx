import React from 'react';

interface FooterProps {
    // Add any additional props if needed
}

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className="py-6 md:py-8">
            <div className="container mx-auto">
                <p className="text-center text-sm lg:text-base">
                    Copyright ©2023 | All rights reserved by Learn with Sumit
                </p>
            </div>
        </footer>
    );
};

export default Footer;
