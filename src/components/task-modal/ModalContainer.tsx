// AddTaskFormModal.tsx

import { ReactNode } from "react";

const ModalContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className='w-full h-full fixed left-0 top-0 grid place-items-center bg-white/10'>
            {children}
        </div>
    );
};

export default ModalContainer;