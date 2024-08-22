import React, { useState, useEffect } from 'react';
import Button from '../../Button/Button';
import { useNavigate } from 'react-router-dom';
import { getNotes, updateNoteAPI } from '../../../api/API'; 
import './EditNote.css';

const EditNote = () => {
    const [message, setMessage] = useState(''); 
    const [error, setError] = useState(''); 
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [selectedNoteId, setSelectedNoteId] = useState('');
    const [newNote, setNewNote] = useState({ title: '', text: '' });

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const fetchedNotes = await getNotes();
                if (fetchedNotes && fetchedNotes.length === 0){
                    setMessage('No notes have been loaded yet')
                }
                setNotes(fetchedNotes);
            } catch (error) {
                console.error('Failed to fetch notes:', error);
            }
        };
        fetchNotes();
    }, [selectedNoteId]);

    const handleNoteChange = async (event) => {
        const id = event.target.value;
        setSelectedNoteId(id);
        if (id) {
            const selectedNote = notes.find(note => note.id === parseInt(id, 10));
            if (selectedNote) {
                setNewNote({
                    ...newNote,
                    title: selectedNote.title,
                    text: selectedNote.text
                });
            }
        } else {
            setNewNote({title: '', text: ''})
        }
    };

    const handleSave = async () => {
        if (selectedNoteId ) {
            if (newNote.title && newNote.text){
                try {
                    await updateNoteAPI(selectedNoteId, newNote);
                    setMessage('Note updated successfully'); // Success message
                    setError(''); // Clear any error message
                    setSelectedNoteId('.');
                    setNewNote({title:'',text:''})
                } catch (error) {
                    setMessage(''); 
                    setError('Error updating the note');
                }
            }else{
                setError('Title and text are required'); 
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNote({
            ...newNote,
            [name]: value,
        });
    };

    const backMenu = () => {
        navigate('/'); // Navigate to the main menu
    };

    return (
        <div className="app">
            <h1 className='title'>EDIT NOTES</h1>
            <h2 className='subtitle'>Select a note, edit the fields, then press 'Save'.</h2>
            <div className="note-form-update">
                <select 
                    onChange={handleNoteChange} 
                    value={selectedNoteId}
                    className="select-note"
                >
                    <option value=".">Select a note</option>
                    {notes.map(note => (
                        <option key={note.id} value={note.id}>
                            {note.title}
                        </option>
                    ))}
                </select>
                {selectedNoteId && (
                    <div className="edit-fields">
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
                    </div>
                )}
                <div className="buttons-container">
                    <Button className='option' text="BACK" onClick={backMenu} />
                    <Button text="SAVE" onClick={handleSave} disabled={!selectedNoteId} />
                </div>
                {message && <p className="message">{message}</p>}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default EditNote;
