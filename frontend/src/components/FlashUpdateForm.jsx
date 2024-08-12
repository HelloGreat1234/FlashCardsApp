// src/components/UpdateFlashcardForm.js
import { useState } from 'react';

const UpdateFlashcardForm = ({ flashcard, onUpdateFlashcards, setShowUpdateForm }) => {
    const [question, setQuestion] = useState(flashcard.question || '');
    const [answer, setAnswer] = useState(flashcard.answer || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/api/admin/flashcard/${flashcard.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question, answer, subject_id: flashcard.subject_id }),
            });

            if (res.ok) {
                const updatedFlashcard = await res.json();
                console.log(updatedFlashcard)
                
                onUpdateFlashcards((prevCards) =>
                    prevCards.map((card) => (card.id === updatedFlashcard.flashcard.id ? { ...card, question, answer } : card))
                );
                setShowUpdateForm(false);
            } else {
                console.error("Failed to update flashcard");
            }
        } catch (error) {
            console.error("Error updating flashcard:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Update Flashcard</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Question</label>
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Answer</label>
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded-md"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowUpdateForm(false)}
                            className="ml-2 bg-red-600 text-white px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateFlashcardForm;
