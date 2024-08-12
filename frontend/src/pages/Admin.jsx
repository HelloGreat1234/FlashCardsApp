import { useState, useEffect } from "react";
import FlashCard from "../components/flashCards";
import FlashcardForm from "../components/FlashCardForm";
import UpdateFlashcardForm from "../components/FlashUpdateForm";
import { Link } from "react-router-dom";

const Admin = () => {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [subjects, SetSubjects] = useState([]);
    const [Flashcard, SetFlashCards] = useState([])
    const [addFlashForm, SetAddFlashForm] = useState(false)
    const [updateFlashcard, setUpdateFlashcard] = useState(null);
    const [newSubject, setNewSubject] = useState({ name: '', description: '' });
    const [addSubjectForm, setAddSubjectForm] = useState(false);

    const callFlashCards = async (subject) => {
        const res = await fetch(`http://localhost:3000/api/admin/flashcards/${subject}`, {
            method: "GET"
        });

        const data = await res.json();
        // SetSubjects(data);
        SetFlashCards(data);
        console.log(data);
    };

    const handleSubjectChange = (e) => {
        const subject = e.target.value;
        setSelectedSubject(e.target.value);
        callFlashCards(subject)
    };

    const DeleteCard = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/admin/flashcard/${id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                // Remove the deleted card from the local state
                SetFlashCards((prevCards) => prevCards.filter((card) => card.id !== id));
                console.log("Flashcard deleted successfully");
            } else {
                console.error("Failed to delete flashcard");
            }
        } catch (error) {
            console.error("Error deleting flashcard:", error);
        }
    }

    const addSubject = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/admin/subjects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSubject),
            });

            if (res.ok) {
                const data = await res.json();
                SetSubjects((prev) => [...prev, data.subject]);
                setAddSubjectForm(false);
                setNewSubject({ name: '', description: '' });
            } else {
                console.error("Failed to add subject");
            }
        } catch (error) {
            console.error("Error adding subject:", error);
        }
    };


    useEffect(() => {
        const call = async () => {
            const res = await fetch('http://localhost:3000/api/user/subjects', {
                method: "GET"
            });

            const data = await res.json();
            SetSubjects(data);
            console.log(data);
        };

        call();
    }, []);
    return (
        <>
            <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
                <Link to='/' className="mb-5 underline"> Go to Home</Link>
                <div className="w-full max-w-md flex">
                    <select
                        value={selectedSubject}
                        onChange={handleSubjectChange}
                        className="block w-full p-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg focus:outline-none focus:ring-2 "
                    >
                        <option value="" disabled>Select a subject</option>
                        {subjects.map((sub) => (
                            <option value={sub.id} key={sub.id}>{sub.name}</option>
                        ))}
                    </select>
                    <button onClick={() => setAddSubjectForm(true)} className="ml-2 p-2 bg-blue-500 text-white rounded-lg">Add Subject</button>
                </div>
                <div className={`flex flex-col items-center font-bold rounded-md w-full max-w-lg text-center mt-4 border shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-3 ${!selectedSubject ? 'justify-center' : ''}`}
                    style={{ flexGrow: 1, minHeight: '100px', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
                    {selectedSubject ?
                        <>
                            <button onClick={() => SetAddFlashForm(true)} className="mt-3 mb-3 bg-green-600 p-3 rounded-md text-white">Add a new Card</button>
                            {/* <div className="border-black border-2 w-[100%]">
                    Hello
                    </div> */}
                            {Flashcard.map((obj) => {
                                return (
                                    <div
                                        key={obj.id}
                                        className="flex items-center justify-between py-2 px-4 w-full m-1 text-left rounded-md bg-white shadow-md"
                                    >
                                        <div>
                                            <h1 className="font-bold">Q. {obj.question}</h1>
                                            <p className="font-normal">Ans. {obj.answer}</p>
                                        </div>
                                        <div className="mx-4">

                                            <button onClick={() => setUpdateFlashcard(obj)} className="bg-green-500 font-normal block my-1 text-white px-2 py-1 rounded-md">
                                                Update
                                            </button>
                                            <button className="bg-red-500 font-normal block my-1 text-white px-2 py-1 rounded-md" onClick={() => DeleteCard(obj.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                        : "Select subject to see flashCards appear here"}

                </div>
            </div>
            {addFlashForm ?
                <div className="absolute top-0 w-[100vw] h-[100vh] bg-black/25 flex items-center justify-center">
                    <div className="w-[50%] flex items-center justify-center">
                        <FlashcardForm subject_id={selectedSubject} onUpdateFlashcards={SetFlashCards} SetAddFlashForm={SetAddFlashForm} />
                    </div>
                </div> : ''}
            {updateFlashcard && (
                <UpdateFlashcardForm
                    flashcard={updateFlashcard}
                    onUpdateFlashcards={SetFlashCards}
                    setShowUpdateForm={setUpdateFlashcard}
                />
            )}
            {addSubjectForm && (
                <div className="absolute top-0 w-[100vw] h-[100vh] bg-black/25 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[50%]">
                        <h2 className="text-2xl mb-4">Add a New Subject</h2>
                        <input
                            type="text"
                            value={newSubject.name}
                            onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                            placeholder="Subject Name"
                            className="w-full mb-4 p-2 border rounded"
                        />
                        <textarea
                            value={newSubject.description}
                            onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                            placeholder="Subject Description"
                            className="w-full mb-4 p-2 border rounded"
                        />
                        <div className="flex justify-end">
                            <button onClick={() => setAddSubjectForm(false)} className="mr-4 p-2 bg-red-500 text-white rounded">Cancel</button>
                            <button onClick={addSubject} className="p-2 bg-blue-500 text-white rounded">Add Subject</button>
                        </div>
                    </div>
                </div>)}
        </>
    );
}

export default Admin;
