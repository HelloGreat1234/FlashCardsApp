import React, { useState } from 'react';

const FlashcardForm = ({ subject_id, onUpdateFlashcards,SetAddFlashForm }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        SetAddFlashForm(false)
        const res = await fetch('http://localhost:3000/api/admin/flashcard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subject_id, question, answer }),
        });
        const newFlashcard = await res.json();
        onUpdateFlashcards((prev) => [...prev, newFlashcard.flashcard]);
        setQuestion('');
        setAnswer('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg">
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Question"
                className="p-2 border rounded w-full"
                required
            />
            <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Answer"
                className="mt-2 p-2 border rounded w-full"
                rows="4"
                required
            />
            <button
                type="submit"
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
                Add Flashcard
            </button>
        </form>
    );
};

export default FlashcardForm;
