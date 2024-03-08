import React from 'react';

interface FloatingActionsProps {
    likeCount: number;
    commentCount: number;
}

const FloatingActions: React.FC<FloatingActionsProps> = ({ likeCount, commentCount }) => {
    return (
        <div className="floating-action">
            <ul className="floating-action-menus">
                <li>
                    <img src="./assets/icons/like.svg" alt="like" />
                    <span>{likeCount}</span>
                </li>
                <li>
                    <img src="./assets/icons/heart.svg" alt="Favourite" />
                </li>
                <a href="#comments">
                    <li>
                        <img src="./assets/icons/comment.svg" alt="Comments" />
                        <span>{commentCount}</span>
                    </li>
                </a>
            </ul>
        </div>
    );
};

export default FloatingActions;
