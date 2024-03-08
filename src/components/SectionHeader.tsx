import { FC, ReactNode } from "react";

interface SectionHeaderProps {
    children: ReactNode;
}

const SectionHeader: FC<SectionHeaderProps> = ({ children }) => {
    return (
        <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
            {children}
        </h3>
    );
};

export default SectionHeader