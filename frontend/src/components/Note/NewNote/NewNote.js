import React, { useState } from 'react';
import Button from '../../Button/Button';
import { useNavigate } from 'react-router-dom';
import './NewNote.css';
import { newNoteAPI } from '../../../api/API';

const NewNote = () => {
    const [newNote, setNewNote] = useState({ title: '', text: '' });
    const [message, setMessage] = useState(''); // Estado para el mensaje
    const [error, setError] = useState(''); // Estado para el error
    const navigate = useNavigate();

    const backMenu = () => {
        navigate('/'); // Navega a la ruta principal
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNote({
            ...newNote,
            [name]: value,
        });
    };

    const handleAddNote = async () => {
        if (newNote.title && newNote.text) {
            try {
                await newNoteAPI(newNote);
                setMessage('Note added successfully'); // Success message
                setError(''); // Clear any error message
                setNewNote({ title: '', text: '' }); // Clear the form
            } catch (error) {
                setMessage(''); // Clear success message if there's an error
                setError('Error adding the note'); // Error message
            }
        } else {
            setMessage(''); // Clear success message if fields are missing
            setError('Title and text are required');
        }
    };
    

    return (
        <div className="app">
            <h1 className='title'>NEW NOTES</h1>
            <h2 className='subtitle'>Complete the fields, then press 'Save' to create a Note.</h2>
            <div className="note-form">
                <label htmlFor="title">
                    Title <span className="required">*</span>
                </label>
                <input 
                    id="title"
                    type="text" 
                    name="title"
                    value={newNote.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="note-input"
                />
                <label htmlFor="text">
                    Text <span className="required">*</span>
                </label>
                <textarea 
                    id="text"
                    name="text"
                    value={newNote.text}
                    onChange={handleInputChange}
                    placeholder="Write your note here..."
                    className="note-textarea"
                />
                <div className="buttons-container">
                    <Button className='option' text="BACK" onClick={backMenu} />
                    <Button text="SAVE" onClick={handleAddNote} />
                </div>
                {message && <p className="message">{message}</p>}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default NewNote;
