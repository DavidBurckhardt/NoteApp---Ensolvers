import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import { getNotes, deleteNoteAPI, deleteAllNotesAPI } from '../../../api/API';
import './DeleteNote.css'; 

const DeleteNote = () => {
    const [message, setMessage] = useState(''); // Estado para el mensaje
    const [error, setError] = useState(''); // Estado para el error
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [selectedNoteId, setSelectedNoteId] = useState(null);

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

    const handleNoteChange = (event) => {
        setSelectedNoteId(event.target.value);
    };

    const handleDeleteNote = async () => {
        try {
            if (selectedNoteId === 'DELETE_ALL_NOTES') {
                await deleteAllNotesAPI(); 
                setMessage('All notes deleted successfully');
            } else {
                await deleteNoteAPI(selectedNoteId);
                setMessage('Note deleted successfully');
            }
            setError(''); 
            setSelectedNoteId('.');
        } catch (error) {
            setMessage(''); 
            setError('Error deleting the note'); 
        }
    };

    const backMenu = () => {
        navigate('/'); 
    };

    return (
        <div className="app">
            <h1 className='title'>DELETE NOTES</h1>
            <h2 className='subtitle'>Select a note, then press 'OK' to delete</h2>
            <div className="note-form-delete">
                <select 
                    onChange={handleNoteChange} 
                    value={selectedNoteId}
                    className="select-note"
                >
                    <option value=".">Select a note</option>
                    <option className="deleteall" value="DELETE_ALL_NOTES">Delete All</option>
                    {notes.map(note => (
                        <option key={note.id} value={note.id} onClick={handleNoteChange}>
                            {note.title}
                        </option>
                    ))}
                </select>
                <div className="buttons-container">
                    <Button className='option' text="BACK" onClick={backMenu} />
                    <Button text="OK" onClick={handleDeleteNote} disabled={!selectedNoteId} />
                </div>
                {message && <p className="message">{message}</p>}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default DeleteNote;
