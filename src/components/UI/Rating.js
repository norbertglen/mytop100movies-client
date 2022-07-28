import { useState } from 'react';
import { MdStarBorder, MdStar } from 'react-icons/md';

const Rating = ({onChange, value}) => {
    const [rating, setRating] = useState(value || -1);
    const handleChange = (val) => {
        setRating(val)
        onChange?.(val)
    }
    return (
        <div
            style={{
                display: 'inline-flex',
                position: 'relative',
                cursor: 'pointer',
                textAlign: 'left',
            }}
        >
            {Array.from({length: 5}, (_, i) => i + 1).map((num) => {
                return (
                    <div
                        position="relative"
                        key={num}
                        style={{
                            cursor: 'pointer',
                        }}
                        onClick={() => handleChange(num)}
                    >
                        {num <= rating ? <MdStar /> : <MdStarBorder />}
                    </div>
                );
            })}
        </div>

    );
};
export default Rating;