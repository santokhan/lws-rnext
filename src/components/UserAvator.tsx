import { FC, ReactNode } from 'react';
import { avatarURL } from '../utils/api-url';

interface AvatarProps {
    children: ReactNode;
    className?: string;
}

const Avatar: FC<AvatarProps> = ({ children, className = "bg-indigo-600" }) => {
    return (
        <div className={["flex-shrink-0 avatar-img text-white rounded-full w-10 h-10 grid place-items-center font-bold capitalize overflow-hidden", className].join(" ")}>
            {children}
        </div>
    );
};

interface AvatarOrInitialProps {
    thumbnail: unknown;
    initial: string;
    className?: string;
}

export const AvatarOrInitial: FC<AvatarOrInitialProps> = ({ thumbnail, initial, className = "bg-indigo-600" }) => {
    return (
        <Avatar className={className}>
            {
                typeof thumbnail === "string" ?
                    <img src={avatarURL(thumbnail)} alt={thumbnail} className='object-cover rounded-full' />
                    :
                    initial
            }
        </Avatar>
    );
};

export default Avatar;
