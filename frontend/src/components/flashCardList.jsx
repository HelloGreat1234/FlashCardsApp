import { useState, useEffect } from "react";
import FlashCard from "./flashCards";
import { IoArrowBackCircle } from "react-icons/io5";

const FlashCardList = ({ id, back }) => {
    const [currCard, setCurrCard] = useState(0);
    const [list, SetList] = useState([]);

    useEffect(() => {
        const call = async () => {
            const res = await fetch(`http://localhost:3000/api/admin/flashcards/${id}`, {
                method: "GET"
            });

            const data = await res.json();
            SetList(data);
            console.log(data);
        };

        call();
    }, [id]);

    const nextCard = () => {
        if (currCard < list.length - 1) {
            setCurrCard((currCard) => currCard + 1);
        }
    };

    const prevCard = () => {
        if (currCard > 0) {
            setCurrCard((currCard) => currCard - 1);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="border-2 border-gray-800 h-[500px] w-[75vw] rounded-lg bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-xl p-6 space-y-6">
                <button className="absolute"
                onClick={()=>{back(false)}}
                >
                    <IoArrowBackCircle size={50} color="#2196F3"/>
                </button>
                <p className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                    FlashCard Test
                </p>

                <div className="aspect-[5/3] h-[55vh] flex bg-gray-900 border-2 border-gray-800 rounded-lg overflow-hidden shadow-lg mx-auto">
                    <div
                        className={`flex transition-transform duration-500 ease-in-out`}
                        style={{ transform: `translateX(-${currCard * 300 * (5 / 3)}px)` }}
                    >
                        {list.map((ele) => (
                            <div key={ele.id} className="flex-shrink-0 h-[300px] aspect-[5/3]">
                                <FlashCard answer ={ele.answer} question = {ele.question} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-evenly">
                    <button
                        className="bg-gradient-to-r from-blue-500 to-teal-400 px-6 py-3 rounded-md text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105"
                        onClick={prevCard}
                    >
                        Previous
                    </button>
                    <button
                        className="bg-gradient-to-r from-blue-500 to-teal-400 px-6 py-3 rounded-md text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105"
                        onClick={nextCard}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlashCardList;
