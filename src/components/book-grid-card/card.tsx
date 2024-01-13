import { Star } from 'iconsax-react';
import bookImage from '../../assets/images/book.png';
import AddToCart from '../buttons/add-to-cart';
import FavoriteButton from '../buttons/favorite';
import { useState } from 'react';

export type BookCardProps = Record<string, any>;

const BookCard = <T extends BookCardProps>({ book }: { book: T }) => {
    if (!book.title && !book.author && !book.price) {
        return null;
    }

    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="space-y-3">
            {/* thumbnail */}
            <div className="flex items-center justify-center rounded-md border border-[#324251]/30 bg-white p-4">
                <img className="max-w-[144px]" src={bookImage} alt="book name" />
            </div>
            {/* info */}
            <div className="space-y-3">
                <h4 className="text-lg font-bold lg:text-xl">{book.title}</h4>
                <p className="text-xs lg:text-sm">
                    By: <span>{book.author}</span>
                </p>
                <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold lg:text-xl">${book.price}</h4>
                    {/* stars */}
                    <div className="flex items-center space-x-1">
                        <Star size="24" color="#FF8A65" variant='Bold' />
                        <Star size="24" color="#FF8A65" variant='Bold' />
                        <Star size="24" color="#FF8A65" variant='Bold' />
                        <Star size="24" color="#FF8A65" variant='Bold' />
                        <span className="text-xs lg:text-sm">(4 Star)</span>
                    </div>
                    {/* stars ends */}
                </div>

                <div className="flex items-center gap-3 text-xs lg:text-sm">
                    <AddToCart onClick={() => { }} />
                    <FavoriteButton onClick={() => { setIsFavorite(!isFavorite) }} active={isFavorite} />
                </div>
            </div>
        </div>
    );
};

export default BookCard;
