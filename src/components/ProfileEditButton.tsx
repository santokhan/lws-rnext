import { Edit } from "iconsax-react";
import { FC, MouseEvent } from "react";

interface ProfileEditButtonProps {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ProfileEditButton: FC<ProfileEditButtonProps> = ({ onClick }) => {
    return (
        <button
            className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
            onClick={onClick} // Pass onClick event handler
        >
            <Edit className='w-4 h-4' />
        </button>
    );
};

export default ProfileEditButton;
