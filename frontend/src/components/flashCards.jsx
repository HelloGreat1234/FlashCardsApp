import React, { useState } from 'react';
import '../css/flashcard.css'; // Import your custom CSS file for additional styles

const FlashCard = ({question, answer, id}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`relative aspect-[5/3] h-[300px] cursor-pointer perspective-1000`} onClick={handleClick}>
            <div className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-x-180' : ''}`}>
                <div className="absolute w-full h-full backface-hidden bg-red-400 flex items-center justify-center">
                    {/* Front content */}
                    <div className="text-center px-5">{question}</div>
                </div>
                <div className="absolute w-full h-full backface-hidden bg-green-500 rotate-x-180 flex items-center justify-center">
                    {/* Back content */}
                    <div className="text-center px-5">{answer}</div>
                </div>
            </div>
        </div>
    );
};

export default FlashCard;
