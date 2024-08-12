import React, { useState, useEffect } from 'react';
import FlashCardList from '../components/flashCardList';
import { Link } from 'react-router-dom';

// const subjects = ['Math', 'Science', 'History', 'Literature'];

const HomePage = () => {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [startTest, setStartTest] = useState(false);
    const [subjects, SetSubjects] = useState([])

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
    };

    const handleStartTest = () => {
        // if (selectedSubject) {
            setStartTest(true);
        // }
    };

    useEffect(() => {
        const call = async () => {

            const res = await fetch('http://localhost:3000/api/user/subjects', {
                method: "GET"
            });

            const data = await res.json();
            SetSubjects(data)
            console.log(data)
        }

        call();
    }, [])


    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center">
            {!startTest ? (
                <div className="text-center space-y-8">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 ">
                        Welcome to FlashLearn
                    </h1>
                    <p className="text-lg font-light text-gray-400">
                        Select a subject to start your journey.
                    </p>

                    <div className=" flex justify-center items-center">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative block w-64 text-left">
                                <select
                                    className="block w-full mt-1 text-gray-900 bg-white border border-transparent rounded-md shadow-lg focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 hover:shadow-xl transition-all h-8"
                                    value={selectedSubject}
                                    onChange={handleSubjectChange}
                                >
                                    <option value="" disabled>Select a subject</option>
                                    {/* {Object.keys(subjects).map((ind) => (
                                        <option key={ind} value={ind}>
                                            {subjects[ind]}
                                        </option>
                                    ))} */}
                                    {subjects.map((sub)=>{
                                        return(
                                            <option value={sub.id} key={sub.id}>{sub.name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <button
                                className={`px-8 py-3 rounded-md text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-teal-400 hover:from-teal-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 ${!selectedSubject && 'opacity-50 cursor-not-allowed'
                                    }`}
                                onClick={handleStartTest}
                            >
                                Start Test
                            </button>
                            <Link to='/admin'  className="mt-4 text-lg font-semibold text-blue-400 hover:text-blue-500 transition-colors">Go to Admin</Link>
                        </div>
                    </div>

                </div>
            ) : (<FlashCardList id={selectedSubject} back={setStartTest}/>
            )}
        </div>
    );
};

export default HomePage;
