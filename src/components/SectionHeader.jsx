import React from 'react';

const SectionHeader = ({ children }) => {
    return (
        <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
            {children}
        </h3>
    );
};

export default SectionHeader