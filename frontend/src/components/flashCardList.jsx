import { useState, useEffect } from "react";
import FlashCard from "./flashCards";
import { IoArrowBackCircle } from "react-icons/io5";

const FlashCardList = ({ id, back }) => {
    const [currCard, setCurrCard] = useState(0);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const call = async () => {
            try {
                const res = await fetch(`https://flashcardstakeyouforwar.onrender.com/api/admin/flashcards/${id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });

                if (!res.ok) {
                    throw new Error(`Error: ${res.statusText}`);
                }

                const data = await res.json();
                setList(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
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
            <div className="border-2 border-gray-800 h-[500px] w-[75vw] rounded-lg bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-xl p-6 space-y-6 relative">
                <button className="absolute top-4 left-4" onClick={() => { back(false) }}>
                    <IoArrowBackCircle size={50} color="#2196F3" />
                </button>
                <p className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                    FlashCard Test
                </p>

                {loading ? (
                    <p className="text-center text-white">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">Error: {error}</p>
                ) : (
                    <div className="aspect-[5/3] h-[55vh] flex bg-transparent rounded-lg overflow-hidden shadow-lg mx-auto">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currCard * 100}%)` }}
                        >
                            {list.map((ele, index) => (
                                <div key={index} className="flex-shrink-0 h-full w-full">
                                    <FlashCard answer={ele.answer} question={ele.question} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-evenly">
                    <button
                        className="bg-gradient-to-r from-blue-500 to-teal-400 px-6 py-3 rounded-md text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105"
                        onClick={prevCard}
                        disabled={currCard === 0}
                    >
                        Previous
                    </button>
                    <button
                        className="bg-gradient-to-r from-blue-500 to-teal-400 px-6 py-3 rounded-md text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105"
                        onClick={nextCard}
                        disabled={currCard === list.length - 1}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlashCardList;
