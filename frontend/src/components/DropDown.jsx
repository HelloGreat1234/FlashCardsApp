import React, { useState, useEffect } from 'react';

const CustomDropdown = ({ subjects, onSubjectSelect, onDeleteSubject }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('');

    const handleSubjectClick = (subject) => {
        setSelectedSubject(subject.name);
        onSubjectSelect(subject.id);
        setIsOpen(false);
    };

    const handleDeleteClick = (e, subjectId) => {
        e.stopPropagation();
        onDeleteSubject(subjectId);
    };

    return (
        <div className="relative inline-block text-left w-full">
            <div>
                <button
                    type="button"
                    className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedSubject || 'Select a subject'}
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 011.414 0L10 13.414l3.293-3.707a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 10.828l-4.293 4.293a1 1 0 01-1.414-1.414l4-4z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <ul className="py-1">
                        {subjects.map((subject) => (
                            <li
                                key={subject.id}
                                className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                onClick={() => handleSubjectClick(subject)}
                            >
                                <span>{subject.name}</span>
                                <button
                                    onClick={(e) => handleDeleteClick(e, subject.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
